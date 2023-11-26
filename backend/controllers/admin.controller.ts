import AdminUsecase from "../usecases/admin.usecase"

class AdminController {
	private adminUsecase: AdminUsecase

	constructor(adminUsecase: AdminUsecase) {
		this.adminUsecase = adminUsecase
	}

	async getUserDetails() { }
	async editUser() { }
	async createUser() { }
}

export default AdminController
