import ChatModel from "../models/chat.model"

class ChatRepository {
	constructor() { }

	async getChats(id: string) {
		try {
			const chats = await ChatModel.find({ "members.user": { $in: id } }).populate("members.user")
			return {
				success: true,
				message: "chats fetched",
				chats
			}
		} catch (error) {
			console.log(error)
			return {
				success: false,
				message: "database error"
			}
		}
	}

	async createChat(data: { members: { user: string, role: "admin" | "user" }[] }) {
		try {
			const response = await new ChatModel({
				group: false,
				members: data.members,

			}).save()


			return {
				success: true,
				message: "chat created"
			}
		} catch (error) {
			console.log(error)
			return {
				success: false,
				message: "database error"
			}
		}
	}

	async changeLatestMessage(id: string, message: string) {
		try {
			const time = Date.now()
			await ChatModel.updateOne(
				{ _id: id },
				{ $set: { latestMessage: message, latestMessageTime: time } })
			return {
				success: true,
				message: "chat updated"
			}
		} catch (error) {
			console.log(error)
			return {
				success: false,
				message: "database error"
			}
		}
	}

	async createGroup(data: { groupName: string, description?: string, members: { user: string, role: "user" | "admin" }[] }) {
		try {
			const response = await new ChatModel({ ...data, group: true }).save()
			return {
				success: true,
				message: "group created successfully",
				group: response
			}
		} catch (error) {
			console.log(error)
			return {
				success: false,
				message: "database error"
			}
		}
	}

	async addMember(data: { id: string, user: string, role: "admin" | "user" }) {
		try {
			const { id, role, user } = data
			const response = await ChatModel.updateOne(
				{ _id: id },
				{
					$addToSet: {
						members: { user, role }
					}
				})

			return {
				success: true,
				message: "member added"
			}
		} catch (error) {
			console.log(error)
			return {
				success: false,
				message: "database error"
			}
		}
	}

	async deleteMember(data: { id: string, user: string }) {
		try {
			const response = await ChatModel.updateOne(
				{ _id: data.id },
				{ $pull: { members: { user: data.user } } }
			)

			return {
				success: true,
				message: "member removed"
			}
		} catch (error) {
			console.log(error)
			return {
				success: false,
				message: "database error"
			}
		}
	}
}

export default ChatRepository
