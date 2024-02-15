import IMessage from "../interface/message.interface"
import ChatModel from "../models/chat.model"
import MessageModel from "../models/message.model"

class MessageRepository {
	constructor() { }

	async create(data: IMessage) {
		try {
			const response = await new MessageModel(data).save()
			return {
				success: true,
				message: "message saved",
				data: response
			}
		} catch (error) {
			console.log(error)
			return {
				success: false,
				message: "database error"
			}
		}
	}

	async delete() {
		try {

		} catch (error) {
			return {
				success: false,
				message: "database error"
			}
		}
	}

	async getAllMessages(id: string, userId: string) {
		try {
			const messages = await MessageModel.find({ chat: id }).populate("file")
			await ChatModel.updateOne(
				{ _id: id },
				{ $set: { "members.$[elem].unread": 0 } },
				{ arrayFilters: [{ "elem.user": userId }] }
			)

			return {
				success: true,
				message: "fetched messages",
				messages
			}
		} catch (error) {
			return {
				success: false,
				message: "database error"
			}
		}
	}

	async getConversation(id: string, friend: string) {
		try {
			const response = await MessageModel.find({
				$or: [
					{ sender: id, reciever: friend },
					{ sender: friend, reciever: id }
				]
			})

			return {
				success: true,
				message: "successfully fetched chat",
				conversation: response
			}
		} catch (error) {
			return {
				success: false,
				message: "database error"
			}
		}
	}
}

export default MessageRepository
