import ChatUsecase from "../usecases/chat.usecase"
import { Request, Response } from "express"
import JwtRepository from "../repository/jwt.repository"

class ChatController {
	private chatUsecase: ChatUsecase
	private jwtRepository: JwtRepository

	constructor(chatUsecase: ChatUsecase, jwtRepository: JwtRepository) {
		this.chatUsecase = chatUsecase
		this.jwtRepository = jwtRepository
	}

	async getAllRequest(req: Request, res: Response) {
		try {
			let id: any
			if (req.headers.authorization) {
				id = this.jwtRepository.decode(req.headers.authorization) as string
			}
			const response = await this.chatUsecase.findAllRequest(id)
			res.status(response?.status).send(response?.data)
		} catch (error) {
			console.log(error)
			res.status(500).send({
				success: false,
				message: "server error"
			})
		}
	}

	async getAllMessages(req: Request, res: Response) {
		try {
			let id: any
			if (req.headers.authorization) {
				id = this.jwtRepository.decode(req.headers.authorization)
			}
			const response = await this.chatUsecase.getAllMessages(id)
			res.status(response.status).send(response.data)
		} catch (error) {
			console.log(error)
			res.status(500).send({
				success: false,
				message: "server error"
			})
		}
	}

	async getConversation(req: Request, res: Response) {
		try {
			const params = req.params
			const id = this.jwtRepository.decode(req.headers.authorization!)
			const response = await this.chatUsecase.getConversation(id as string, params.id)
			res.status(response.status).send(response.data)
		} catch (error) {
			res.status(500).send({
				success: false,
				message: "server error"
			})
		}
	}
}

export default ChatController
