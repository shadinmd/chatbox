import { Request, Response } from "express";
import AuthUsecase from "../usecases/auth.usecase";

class AuthController {
	private authUsecase: AuthUsecase
	constructor(authUsecase: AuthUsecase) {
		this.authUsecase = authUsecase
	}

	async login(req: Request, res: Response) {
		try {

		} catch (error) {

		}
	}

	async register(req: Request, res: Response) {
		try {

		} catch (error) {

		}
	}
}

export default AuthController
