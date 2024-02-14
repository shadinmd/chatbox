"use client";
import Container from "@/components/Container"
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react"
import React, { useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";
import { toast } from "sonner";
import ChatMenu from "@/components/chat/ChatMenu";
import Api from "@/services/Api";
import { isAxiosError } from "axios";
import ChatModal from "@/components/chat/ChatModal";
import chatSlice from "@/redux/features/chat/chatSlice";
import parseTime from "@/utils/timeParser";

const s3Url = "https://chatbox-files.s3.ap-south-1.amazonaws.com"

const ChatUser = ({ params }: { params: { id: string } }) => {

	const user = useSelector((state: RootState) => state?.user?.user)
	const chat = useSelector((state: RootState) => state.chat.chats.find((e) => e?._id == params?.id))
	const friend = useSelector((state: RootState) => state.chat.chats.find((e) => e?._id == params?.id))?.members?.find((e) => e?.user?._id != user?._id)?.user
	const socket = useSelector((state: RootState) => state.socket.socket)
	const dispatch: AppDispatch = useDispatch()

	const [message, setMessage] = useState("")
	const [file, setFile] = useState<File | null>(null)
	const [chatModal, setChatModal] = useState(false)

	const [messages, setMessages] = useState<Array<any>>([])

	useEffect(() => {
		Api.get(`/chat/messages/${params.id}`)
			.then((resposne) => {
				if (resposne.data.message) {
					console.log(resposne.data)
					setMessages(resposne.data.messages)
				} else {
					toast.error(resposne.data.message)
				}
			}).catch(error => {
				if (isAxiosError(error))
					if (error.response?.data.message)
						toast.error(error.response.data.message)
					else
						toast.error(error.message)
				else
					toast.error("something went wrong")
				console.log(error)
			})
	}, [])

	useEffect(() => {
		socket?.on("message:recieve", (data) => {
			console.log(data)
			if (data.chat == params.id) {
				setMessages((prev) => [...prev, data])
			}
		})
	}, [socket])

	const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const data: any = {}

		if (file) {
			data.file = {
				buffer: file,
				size: file.size,
				name: file.name
			}
			data.key = `shared/${params.id}/${Date.now()}${file.name}`
		}

		data.text = message
		data.createdAt = Date.now()
		data.sender = user._id
		data.chat = params.id
		data.username = user?.username
		data.to = friend?._id
		data.group = chat?.group
		console.log(data)
		dispatch(chatSlice.actions.updateLatestMessage({ id: data.chat, message: data.text || data.file.name, time: new Date(Date.now()) }))

		if (message || file) {
			setMessages((prev) => [...prev, { ...data, file: file }])
			socket?.emit("message:send", data)
			setMessage("")
			setFile(null)
		}
	}

	const changeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		const selectedFile = e?.target?.files![0]
		const maxsize = 5 * 1024 * 1024
		if (selectedFile.size > maxsize) {
			toast.error("file size limit 5mb")
		} else {
			setFile(selectedFile)
		}
	}

	return (
		<Container className="flex-col items-center justify-center p-5 gap-2 text-custom-blue">
			<div className="flex w-full h-20 gap-4 px-7 items-center justify-between border-b-2 border-custom-dark-grey">
				{
					chat?.group ?
						<ChatModal className="flex gap-4 items-center" open={chatModal} onOpenChange={setChatModal} chatId={params.id}>
							<div className="rounded-full bg-white h-12 w-12">
								<div className="flex items-center justify-center h-full w-full rounded-full bg-white" >
									<Icon icon={"mdi:account-group"} className="text-4xl" />
								</div>
							</div>
							<p className="text-xl font-bold">
								{
									chat?.group ?
										chat.groupName :
										friend?.username
								}
							</p>
						</ChatModal> :
						<div className="flex gap-4 items-center">
							<div className="rounded-full bg-white h-12 w-12">
								{
									friend?.image ?
										<img src={friend.image} className="h-full w-full rounded-full" alt="" /> :
										<div className="flex items-center justify-center h-full w-full rounded-full bg-white" >
											<Icon icon={"mdi:person"} className="text-custom-blue text-3xl" />
										</div>
								}
							</div>
							<div>
								<p className="text-xl font-bold">
									{
										chat?.group ?
											chat.groupName :
											friend?.username
									}
								</p>
								{
									friend?.online ?
										<p className="text-xs font-bold text-chat-green">
											online
										</p>
										:
										<p className="text-xs">
											last seen {moment(friend?.lastOnline).format("YYYY/MM/DD HH:mm")}
										</p>
								}
							</div>
						</div>

				}
				{
					chat?.group ?
						<div>
							<ChatModal chatId={params.id} open={chatModal} onOpenChange={setChatModal} className="flex gap-4 items-center">
								<Icon className='text-3xl' icon="pepicons-pencil:dots-y" />
							</ChatModal>
						</div> :
						<div className="flex gap-3 items-center">
							<Link href={`/app/call?video=false&user=${friend?._id}&start=true`}>
								<Icon className="text-chat-green h-9 w-10" icon="solar:phone-bold" />
							</Link>
							<Link href={`/app/call?video=true&user=${friend?._id}&start=true`}>
								<Icon className="text-chat-green h-9 w-10" icon="majesticons:video" />
							</Link>
							<ChatMenu chat={params.id} friend={friend?._id!} />
						</div>
				}
			</div>
			<div id="chat-div" className=" p-5 w-full items-center justify-end h-full overflow-y-auto">
				<div className="flex flex-col" >
					{
						messages.map((e, i) => (
							<div key={i} className={`flex flex-col gap-1 w-max ${e?.sender == user?._id ? "self-end" : "self-start"}`}>
								<div className={`bg-chat-blue p-2 rounded-full  ${e?.sender == user?._id ? "bg-custom-red" : "bg-custom-dark-grey"}`}>
									{
										e.file &&
										<Link href={e.file.url ? e.file.url : `${s3Url}/${e.file.key}`}
											className="flex gap-2 items-center justify-center p-2 bg-chat-black rounded-lg">
											<Icon className="text-xl" icon="ic:round-download" />
											<p>{e?.file?.name}</p>
										</Link>
									}
									<p className="text-center  font-bold">
										{e.text}
									</p>
								</div>
								<p className={`opacity-50 text-sm ${e.sender == params.id ? "self-start" : "self-end"}`}>
									{parseTime(e.createdAt)}</p>
							</div>
						))
					}
				</div>
			</div>
			<form onSubmit={sendMessage} className="flex px-3 gap-2 items-center justify-center w-full h-20 border-t-2 border-custom-dark-grey">
				<div className="flex flex-col w-full items-center justify-center relative">
					{
						file &&
						<div className="flex gap-2 p-2 rounded-lg items-center justify-center text-white bg-black absolute self-end -top-12 z-20">
							{
								`selected: ${file.name}`
							}
							<button type="button" onClick={(e) => { setFile(null) }}>
								<Icon icon="maki:cross" className="text-chat-red" />
							</button>
						</div>
					}
					<input type="text" onChange={(e) => setMessage(e.target.value)}
						value={message}
						placeholder="Enter message... "
						className="w-full items-center text-black bg-custom-dark-grey h-12 focus:outline-none px-3 py-2 rounded-full"
					/>
				</div>
				<input type="file" multiple={false} className="hidden" id="file" onChange={changeFile} />
				<label htmlFor="file" className="bg-chat-blue p-3 rounded-full bg-custom-grey cursor-pointer hover:text-5xl">
					<Icon className="text-2xl" icon="akar-icons:attach" />
				</label>
				<button type="submit" className="flex items-center justify-center bg-chat-blue p-3 rounded-full bg-custom-red">
					<Icon className="text-2xl text-white" icon="fa-solid:paper-plane" />
				</button>
			</form>
		</Container>

	)
}

export default ChatUser
