import mongoose from "mongoose";
import IChat from "../interface/chat.interface";

const chatSchema = new mongoose.Schema<IChat>({
	groupName: {
		type: String
	},
	group: {
		type: Boolean,
		required: true
	},
	description: {
		type: String
	},
	latestMessage: {
		type: String
	},
	latestMessageTime: {
		type: Date,
	},
	members: {
		type: [{
			user: { type: String, ref: "User", required: true },
			role: { type: String, enum: ["user", "admin"], required: true }
		}],
	}
})

const ChatModel = mongoose.model("Chat", chatSchema)
export default ChatModel
