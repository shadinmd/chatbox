import ChatUsecase from "../usecases/chat.usecase"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"

class ChatController {
	private chatUsecase: ChatUsecase

	constructor(chatUsecase: ChatUsecase) {
		this.chatUsecase = chatUsecase
	}

	async getAllRequest(req: Request, res: Response) {
		try {
			let id: any
			if (req.headers.authorization) {
				id = jwt.verify(req.headers.authorization, process.env.JWT_SECRET as string) as string
			}
			const response = await this.chatUsecase.findAllRequest(id)
			res.status(response?.status).send(response?.data)
		} catch (error) {
			console.log(error)
			return {
				status: 500,
				data: {
					success: false,
					message: "server error"
				}
			}
		}
	}

	async getAllMessages(req: Request, res: Response) {
		try {
			let id: any
			if (req.headers.authorization) {
				id = jwt.verify(req.headers.authorization, process.env.JWT_SECRET as string) as string
			}
			const response = await this.chatUsecase.getAllMessages(id)
			res.status(response.status).send(response.data)
		} catch (error) {
			console.log(error)
			return {
				status: 500,
				data: {
					success: false,
					message: "server error"
				}
			}
		}
	}
}

export default ChatController
