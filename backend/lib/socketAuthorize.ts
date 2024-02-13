import { Socket } from "socket.io"
import JwtRepository from "../repository/jwt.repository"

const jwtRepository = new JwtRepository()

const socketAuthorize = (token: string, socket: Socket) => {
	try {
		const id = jwtRepository.decode(token)
		if (!id) {
			socket.emit("unauthorized")
			return
		}
		return id
	} catch (error) {
		socket.emit("unauthorized")
		return
	}
}

export default socketAuthorize
