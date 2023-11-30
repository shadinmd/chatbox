import OtpModel from "../models/otp.model"

class OtpRepository {
	constructor() { }

	async create(otp: string, user: string) {
		try {
			const response = await new OtpModel({ otp, user }).save()
			return {
				success: true,
				message: "otp created"
			}
		} catch (error) {
			console.log(error)
			return {
				success: false,
				message: "database error"
			}
		}
	}

	async searchById(id: string) {
		try {
			const response = await OtpModel.findOne({ user: id })
			return {
				success: true,
				message: "otp found",
				otp: response
			}
		} catch (error) {
			console.log(error)
			return {
				success: false,
				message: "database error"
			}
		}
	}

	async searchByEmail(email: string) {
		try {

		} catch (error) {
			console.log(error)
			return {
				success: false,
				message: "database error"
			}
		}
	}
}

export default OtpRepository
