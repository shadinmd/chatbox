import UserRepository from "../repository/user.repository"

class AdminUsecase {
	private userRepository: UserRepository

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository
	}

	async getUserDetails(id: string) {
		try {
			const response = await this.userRepository.findById(id)
			return {
				status: response.success ? 200 : 500,
				data: {
					success: response.success,
					message: response.message
				}
			}
		} catch (error) {
			console.log(error)
			return {
				status: 500,
				data: {
					succcess: false,
					message: "server error"
				}
			}
		}
	}
	async editUser() { }
	async createUser() { }
}

export default AdminUsecase
