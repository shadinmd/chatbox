import MessageRepository from "../repository/message.repository"
import RequestRepositroy from "../repository/request.repository"
import ChatRepository from "../repository/chat.repository"

class ChatUsecase {
	private messageRepository: MessageRepository
	private requestRepository: RequestRepositroy
	private chatRepository: ChatRepository


	constructor(messageRepository: MessageRepository, requestRepository: RequestRepositroy, chatRepository: ChatRepository) {
		this.messageRepository = messageRepository
		this.requestRepository = requestRepository
		this.chatRepository = chatRepository
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

	async getchats(id: string) {
		try {
			const response = await this.chatRepository.getChats(id)
			return {
				status: response.success ? 200 : 500,
				data: {
					success: response.success,
					message: response.message,
					chats: response.chats || []
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

	async createGroup(data: { groupName: string, description?: string, members: { user: string, role: "user" | "admin" }[] }) {
		try {
			const resposne = await this.chatRepository.createGroup(data)
			return {
				status: resposne.success ? 200 : 400,
				data: {
					success: resposne.success,
					message: resposne.message
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

	async addMember(data: { id: string, user: string, role: "user" | "admin" }) {
		try {
			const response = await this.chatRepository.addMember(data)
			return {
				status: response.success ? 200 : 400,
				data: {
					success: response.success,
					message: response.message
				}
			}
		} catch (error) {
			console.log(error)
			return {
				status: 500,
				data: {
					success: false,
					messge: "server error"
				}
			}
		}
	}


	async deleteMember({ id, user }: { id: string, user: string }) {
		try {
			const response = await this.chatRepository.deleteMember({ id, user })
			return {
				status: response.success ? 200 : 400,
				data: {
					success: response.success,
					message: response.message
				}
			}
		} catch (error) {
			console.log(error)
			return {
				status: 500,
				data: {
					success: false,
					messge: "server error"
				}
			}
		}
	}

	async editMember(data: { id: string, user: string, role: "user" | "admin" }) {
		try {

		} catch (error) {
			console.log(error)
			return {
				status: 500,
				data: {
					success: false,
					messge: "server error"
				}
			}
		}
	}


	async editGroup() {
		try {

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

	async deleteGroup() {
		try {

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

	async getAllMessages(id: string, userId: string) {
		try {
			const response = await this.messageRepository.getAllMessages(id, userId)
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

	async getConversation(id: string, friend: string) {
		try {
			const response = await this.messageRepository.getConversation(id, friend)
			return {
				status: response.success ? 200 : 500,
				data: {
					success: response.success,
					message: response.message,
					conversation: response.conversation || []
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
