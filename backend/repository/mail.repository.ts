import nodemailer, { Transporter } from "nodemailer"

class NodemailerRepository {
	private transporter: Transporter
	constructor() {
		this.transporter = nodemailer.createTransport({
			service : "gmail",
			auth: {
				user: process.env.EMAIL,
				pass: process.env.EMAIL_PASS
			}
		})
	}

	async sendVerificationMail(to: string, url: string) {
		try {
			this.transporter.sendMail({
				from: process.env.EMAIL,
				to,
				subject: "Verfication mail for chatbox",
				text: `
				Thank you for registering with chatbox

				please click the link below to verify your account
				${url}

				If you didn't register in chatbox you can ignore this mail

				regards,
				chatbox team
			`
			})
		} catch (error) {
			console.log("nodemailer", error)
		}
	}
}

export default NodemailerRepository
