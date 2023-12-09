import IRequest from "../interface/request.interface"
import MessageRepository from "../repository/message.repository"
import RequestRepositroy from "../repository/request.repository"

class ChatUsecase {
	private messageRepository: MessageRepository
	private requestRepository: RequestRepositroy

	constructor(messageRepository: MessageRepository, requestRepository: RequestRepositroy) {
		this.messageRepository = messageRepository
		this.requestRepository = requestRepository
	}

	async findAllRequest(id: string) {
		try {
			const response = await this.requestRepository.findAllRequest(id)
			return {
				status: response.success ? 200 : 500,
				data: {
					success: response.success,
					message: response.message,
					requests: response.requests
				}
			}
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

	async getAllMessages(id: string) {
		try {
			const response = await this.messageRepository.getMessages(id)
			return {
				status: response.success ? 200 : 500,
				data: {
					success: response.success,
					message: response.message,
					messages: response.messages
				}
			}
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

export default ChatUsecase
