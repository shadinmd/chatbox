import mongoose from "mongoose";
import IRequest from "../interface/request.interface"

const requestSchema = new mongoose.Schema<IRequest>({
	sender: {
		type: String,
		required: true,
		ref : "User"
	},
	reciever: {
		type: String,
		required: true,
		ref : "User"
	},
	status: {
		type: String,
		required: true,
		enum: ["ACCEPTED", "REJECTED", "WAITING"],
		default: "WAITING"
	}
})


const RequestModel = mongoose.model("Request", requestSchema)
export default RequestModel
