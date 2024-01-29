import { Request, Response } from "express"
import AdminUsecase from "../usecases/admin.usecase"

class AdminController {
	private adminUsecase: AdminUsecase

	constructor(adminUsecase: AdminUsecase) {
		this.adminUsecase = adminUsecase
	}

	async getAllUsers(req: Request, res: Response) {
		try {
			const { name } = req.query
			const response = await this.adminUsecase.getAllUsers({ name: name as string })
			res.status(response.status).send(response.data)
		} catch (error) {
			res.status(500).send({
				success: false,
				message: "server error"
			})
		}
	}
	async getUserDetails(req: Request, res: Response) {
		try {
			const { id } = req.params
			const response = await this.adminUsecase.getUserDetails(id)
			res.status(response.status).send(response.data)
		} catch (error) {
			res.status(500).send({
				success: false,
				message: "server error"
			})
		}
	}
	async editUser(req: Request, res: Response) {
		try {
			const { id } = req.params
			const response = await this.adminUsecase.editUser({ _id: id, ...req.body })
			res.status(response.status).send(response.data)
		} catch (error) {
			res.status(500).send({
				success: false,
				message: "server error"
			})
		}
	}
}

export default AdminController
