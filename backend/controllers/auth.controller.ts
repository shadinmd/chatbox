import { Request, Response } from "express";
import AuthUsecase from "../usecases/auth.usecase";

class AuthController {
	private authUsecase: AuthUsecase
	constructor(authUsecase: AuthUsecase) {
		this.authUsecase = authUsecase
	}

	async login(req: Request, res: Response) {
		try {
			const { email, password } = req.body
			const response = await this.authUsecase.login(email, password)
			res.status(response.status).send(response.data)
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

	async register(req: Request, res: Response) {
		try {
			const { email, username, password } = req.body
			const response = await this.authUsecase.register({ email, username, password })
			res.status(response.status).send(response.data)
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

	async getOtp(req: Request, res: Response) {
		try {
			const { id } = req.body
			const response = await this.authUsecase.createOtp(id)
			res.status(response.status).send(response.data)
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

	async verifyOtp(req: Request, res: Response) {
		try {
			const { otp, id } = req.body
			const response = await this.authUsecase.verifyOtp(otp, id)
			res.status(response.status).send(response.data)
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

export default AuthController
