import { request } from "express"
import IRequest from "../interface/request.interface"
import RequestModel from "../models/request.model"

class RequestRepositroy {
	constructor() { }

	async create(data: IRequest) {
		try {
			const response = await new RequestModel(data).save()
			return {
				success: true,
				data: "request send"
			}
		} catch (error) {
			return {
				success: false,
				message: "database error"
			}
		}
	}

	async findAllRequest(id: string) {
		try {
			const response = await RequestModel.find({ reciever: id }).populate({ path: "sender", select: "-password" })
			return {
				success: true,
				message: "found requests",
				requests: response
			}
		} catch (error) {
			return {
				success: false,
				message: "database error"
			}
		}
	}

	async accept({ sender, reciever }: { sender: string, reciever: string }) {
		try {
			const response = await RequestModel.updateOne({ sender, reciever }, { $set: { status: "ACCEPTED" } })
			return {
				success: true,
				message: "accpeted  friendshipt request"
			}
		} catch (error) {
			return {
				success: false,
				message: "database error"
			}
		}
	}

	async find(data: IRequest) {
		try {
			const response = await RequestModel.findOne(data)
			if (response) {
				return {
					success: true,
					message: "request found",
					request: response
				}
			} else {
				return {
					success: false,
					message: "couldn't find request"
				}
			}
		} catch (error) {
			return {
				success: false,
				message: "database error"
			}
		}
	}

	async update(data: IRequest) {
		try {
			const response = await RequestModel.updateOne({ _id: data._id }, { $set: { status: data.status } })
			return {
				success: true,
				message: "request updated"
			}
		} catch (error) {
			return {
				success: false,
				message: "database error"
			}
		}
	}
}

export default RequestRepositroy
