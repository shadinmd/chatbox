import mongoose from "mongoose";
import IMessage from "../interface/message.interface";

const messageSchema = new mongoose.Schema<IMessage>({
	sender: {
		type: String,
		required: true,
		ref: "User"
	},
	chat: {
		type: String,
		required: true,
		ref: "Chat"
	},
	read: {
		type: Boolean,
		default: false
	},
	text: {
		type: String,
	},
	type: {
		type: String,
		enum: ["FILE", "AUDIO", "TEXT"]
	},
	file: {
		type: String,
		ref: "File"
	}
}, { timestamps: true })

const MessageModel = mongoose.model("Message", messageSchema)
export default MessageModel
