import IMessage from "../interface/message.interface"
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

	async getMessages(id: string) {
		try {
			const response = await MessageModel.find({
				$or: [
					{ sender: id },
					{ reciever: id }
				]
			}).populate("file")

			return {
				success: true,
				message: "fetched messages",
				messages: response
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
