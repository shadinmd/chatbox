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


	async getChats(req: Request, res: Response) {
		try {
			const id = this.jwtRepository.decode(req.headers.authorization!)
			const response = await this.chatUsecase.getchats(id as string)
			res.status(response.status).send(response.data)
		} catch (error) {
			console.log(error)
			res.status(500).send({
				success: false,
				message: "server error"
			})
		}
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
			const { id } = req.params
			let userId: string = ""
			if (req.headers.authorization) {
				userId = this.jwtRepository.decode(req.headers.authorization) as string
			}
			const response = await this.chatUsecase.getAllMessages(id, userId)
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

	async createGroup(req: Request, res: Response) {
		try {
			const { name, description } = req.body
			if (!name) {
				res.status(400).send({
					success: false,
					message: "group name not provided"
				})
				return
			}
			const id = this.jwtRepository.decode(req.headers.authorization!)
			const response = await this.chatUsecase.createGroup({ groupName: name, description, members: [{ user: id as string, role: "admin" }] })
			res.status(response.status).send(response.data)
		} catch (error) {
			res.status(500).send({
				success: false,
				message: "server error"
			})
		}
	}

	async addMember(req: Request, res: Response) {
		try {
			const { id, user, role } = req.body
			const response = await this.chatUsecase.addMember({ id, user, role })
			res.status(response.status).send(response.data)
		} catch (error) {
			res.status(500).send({
				success: false,
				messge: "server error"
			})
		}
	}

	async deleteMember(req: Request, res: Response) {
		try {
			const { id, user } = req.body
			const response = await this.chatUsecase.deleteMember({ id, user })
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
