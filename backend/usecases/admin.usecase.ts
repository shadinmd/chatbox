import IUser from "../interface/user.interface"
import UserRepository from "../repository/user.repository"

class AdminUsecase {
	private userRepository: UserRepository

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository
	}

	async getAllUsers(search?: { name: string }) {
		try {
			console.log(search)
			const response = await this.userRepository.findAllUsers(search)
			return {
				status: response.success ? 200 : 500,
				data: {
					success: response.success,
					message: response.message,
					users: response.users || "empty"
				}
			}
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
	async getUserDetails(id: string) {
		try {
			const response = await this.userRepository.findById(id)
			return {
				status: response.success ? 200 : 500,
				data: {
					success: response.success,
					message: response.message,
					user: response.user || "not found"
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
	async editUser(user: IUser) {
		try {
			const response = await this.userRepository.update(user)
			return {
				status: response.success ? 200 : 500,
				data: {
					success: response.success,
					message: response.message,
					user: response.user || "failed to update"
				}
			}
		} catch (error) {
			console.log(error)
			return {
				status: 500,
				data: {
					success: false,
					message: "server error"
				}
			}
		}
	}
	async createUser() { }
}

export default AdminUsecase
