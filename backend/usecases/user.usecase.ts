import IUser from "../interface/user"
import UserRepository from "../repository/user.repository"

class UserUsecase {
	private userRepository: UserRepository

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository
	}

	async userDetails(id: string) {
		const response = await this.userRepository.findById(id)
		try {
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
					success: false,
					message: "server error"
				}
			}
		}
	}

	async edit(user: IUser) {
		try {
			const response = await this.userRepository.update(user)
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
					success: false,
					message: "server error"
				}
			}
		}
	}
}

export default UserUsecase
