import { Request, Response } from "express"
import UserUsecase from "../usecases/user.usecase"

class UserController {
	private userUsecase: UserUsecase

	constructor(userUsecase: UserUsecase) {
		this.userUsecase = userUsecase
	}

	async getUsers(req: Request, res: Response) {
		try {
			const { name } = req.query
			console.log(name)
			const response = await this.userUsecase.getUsers({ name: name as string })
			res.status(response.status).send(response.data)
		} catch (error) {
			res.status(500).send({
				success: false,
				message: "server error"
			})
		}
	}

	async getCurrentUser(req: Request, res: Response) {
		try {
			const { authorization } = req.headers
			const response = await this.userUsecase.currentUser(authorization as string)
			res.status(response.status).send(response.data)
		} catch (error) {
			console.log(error)
			res.status(500).send({
				success: false,
				message: "server error"
			})
		}
	}

	async getUserDetails(req: Request, res: Response) {
		try {
			const { id } = req.params

			const response = await this.userUsecase.getUserDetails(id)
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
			const { username, email, _id, bio } = req.body
			const response = await this.userUsecase.edit({ username, email, _id, bio }, req.file)
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
