import { Request, Response } from "express"
import JwtRepository from "../repository/jwt.repository"
import UserUsecase from "../usecases/user.usecase"

class UserController {
	private jwtRepository: JwtRepository
	private userUsecase: UserUsecase

	constructor(userUsecase: UserUsecase, jwtRepository: JwtRepository) {
		this.userUsecase = userUsecase
		this.jwtRepository = jwtRepository
	}

	async getUsers(req: Request, res: Response) {
		try {
			const { authorization } = req.headers
			const currenUser = await this.userUsecase.currentUser(authorization as string)
			const { name } = req.query
			console.log(name)
			const response = await this.userUsecase.getUsers({
				id: currenUser?.data?.user?._id!,
				name: name as string
			})
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
			const _id = this.jwtRepository.decode(req.headers.authorization!) as string
			const { username, email, bio } = req.body
			const response = await this.userUsecase.edit(
				{ username, email, _id, bio }
				, req.file
			)
			res.status(response.status).send(response.data)
		} catch (error) {
			console.log(error)
			res.status(500).send({
				success: false,
				message: "server error"
			})
		}
	}

	async changePassword(req: Request, res: Response) {
		try {
			const id = this.jwtRepository.decode(req.headers.authorization!) as string
			const { password, newPassword } = req.body
			const response = await this.userUsecase.changePass(password, newPassword, id)
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
