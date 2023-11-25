import MailerRepository from "../repository/mail.repository"
import OtpRepository from "../repository/otp.repository"

class OtpUsecase {
	private otpRepository: OtpRepository
	private mailRepository: MailerRepository
	constructor(otpRepository: OtpRepository, mailRepository: MailerRepository) {
		this.otpRepository = otpRepository
		this.mailRepository = mailRepository
	}

	async send(otp: string, user: string) {
		try {
			const response = await this.otpRepository.create(otp, user)
			this.mailRepository.send()
			if (response.success) {
				return {
					status: 200,
					data: {
						success: true,
						message: response.message
					}
				}
			} else {
				return {
					status: 500,
					data: {
						success: false,
						message: response.message
					}
				}
			}
		} catch (error) {
			return {
				status: 500,
				data: {
					success: false,
					message: "server error"
				}
			}
		}
	}
}

export default OtpUsecase
