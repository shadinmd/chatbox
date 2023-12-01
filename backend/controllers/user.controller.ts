import { Request, Response } from "express"
import UserUsecase from "../usecases/user.usecase"

class UserController {
	private userUsecase: UserUsecase

	constructor(userUsecase: UserUsecase) {
		this.userUsecase = userUsecase
	}

	async getUserDetails(req: Request, res: Response) {
		try {
			const { authorization } = req.headers
			const response = await this.userUsecase.userDetails(authorization as string)
			res.status(response.status).send(response.data)
		} catch (error) {
			console.log(error)
			res.status(500).send({
				success: false,
				message: "server error"
			})
		}
	}

	async edit(req: Request, res: Response) {
		try {
			const { username, email, _id, bio, image } = req.body
			console.log("file", req.body)
			const response = await this.userUsecase.edit({ username, email, _id, bio })
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
