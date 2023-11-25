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
	async searchByEmail(email: string) { }
}

export default OtpRepository
