import nodemailer, { Transporter } from "nodemailer"

class NodemailerRepository {
	private transporter: Transporter
	constructor() {
		this.transporter = nodemailer.createTransport({
			auth: {
				user: process.env.EMAIL,
				pass: process.env.EMAIL_PASS
			}
		})
	}

	async send() {


		this.transporter.sendMail({

		})
	}
}

export default NodemailerRepository
