import { Request, Response } from "express"
import UserUsecase from "../usecases/user.usecase"

class UserController {
	private userUsecase: UserUsecase

	constructor(userUsecase: UserUsecase) {
		this.userUsecase = userUsecase
	}

	async getUserDetails(req: Request, res: Response) {
		try {
			const { id } = req.body
			const response = await this.userUsecase.userDetails(id)
			res.status(response.status).send(response.data)
		} catch (error) {
			res.status(500).send({
				success: false,
				message: "server error"
			})
		}
	}

	async edit(req: Request, res: Response) {
		try {
			const { username, email, id } = req.body
			const response = await this.userUsecase.edit({ username, email, id })
			res.status(response.status).send(response.data)
		} catch (error) {
			console.log(error)
			res.status(500).send({
				success: false,
				message: "server error"
			})
		}
	}
}

export default UserController
