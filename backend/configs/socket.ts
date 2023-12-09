import http from "http"
import scoket from "socket.io"
import RequestRepository from "../repository/request.repository"
import UserRepository from "../repository/user.repository"
import MessageRepository from "../repository/message.repository"
import FileRepository from "../repository/file.repository"
import S3Repository from "../repository/s3.repository"

const requestRepositroy = new RequestRepository()
const userRepository = new UserRepository()
const messageRepository = new MessageRepository()
const fileRepository = new FileRepository()
const s3Repositroy = new S3Repository()
let connections: { id: string, socket: string }[] = []

const getCurrentUserId = (socketId: string) => {
    const currentUser = connections.find((e) => e.socket == socketId)
    return currentUser?.id
}

const getSocketId = (id: string) => {
    const currentUser = connections.find((e) => e.id == id)
    if (currentUser)
        return currentUser.socket
    else
        return false
}

const configureSocket = (server: http.Server) => {
    const io = new scoket.Server(server, {
        cors: {
            origin: "*",
        },
        transports: ["websocket", "polling"]
    })


    io.on("connect", (socket) => {
        console.log(`socket connected ${socket.id}`)

        socket.on("initiate", (data) => {
            connections.push({ id: data.id, socket: socket.id })
            console.log(connections)
        })

        socket.on("chat:request", (data) => {
            const currentUser = getCurrentUserId(socket.id)
            console.log(`${currentUser} requested to ${data.id}`)
            requestRepositroy.create({ sender: currentUser, reciever: data.id })
        })

        socket.on("chat:block", (data) => { })

        socket.on("chat:accept", async (data) => {
            const currentUser = getCurrentUserId(socket.id)
            console.log(`${currentUser} accepted ${data.id}`)
            requestRepositroy.accept({ sender: data.id, reciever: currentUser! })
            await userRepository.addFriend(currentUser!, data.id)
            await userRepository.addFriend(data.id, currentUser!)
        })

        socket.on("message:send", async (data) => {
            const currentUser = getCurrentUserId(socket.id)
            const socketId = getSocketId(data.to)
            let fileRespone: any
            console.log(data)
            if (data.file) {
                const file = data.file
                const key = `shared/${data.username}/${data.file.name}`
                await s3Repositroy.upload(data.file, key)
                const url = await s3Repositroy.getUrl(key)
                // console.log(url)
                fileRespone = await fileRepository.create({ name: file.name, size: file.size, user: currentUser, key })
            }
            const response = await messageRepository.create({ reciever: data.to, createdAt: data.createdAt, sender: currentUser, text: data.text, file: fileRespone?.file._id })
            if (socketId) {
                const message = response.data
                message!.file! = fileRespone.file
                io.to(socketId).emit("message:recieve", response.data)
                io.to(socketId).emit("noti:recieve", { status: "success", message: `${data.username}: ${data.text ? data.text : data?.file?.name}` })
            }
        })

        socket.on("disconnect", () => {
            console.log(`socket disconnected ${socket.id}`)
            connections = connections.filter((e) => e.socket != socket.id)
        })
    })

    return io
}

export default configureSocket 
