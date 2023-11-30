import mongoose from "mongoose";
import IMessage from "../interface/message";

const messageSchema = new mongoose.Schema<IMessage>({
	sender: {
		type: String,
		required: true
	},
	reciever: {
		type: String,
		required: true
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
	}
}, { timestamps: true })

const MessageModel = mongoose.model("Message", messageSchema)
export default MessageModel
