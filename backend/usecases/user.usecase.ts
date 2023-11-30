import IUser from "../interface/user"
import UserRepository from "../repository/user.repository"
import jwt from "jsonwebtoken"

class UserUsecase {
	private userRepository: UserRepository

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository
	}

	async userDetails(token: string) {
		console.log(token)
		const id = jwt.verify(token, process.env.JWT_SECRET as string)
		const response = await this.userRepository.findById(id as string)
		try {
			return {
				status: response.success ? 200 : 500,
				data: {
					success: response.success,
					message: response.message,
					user: response.user
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
					message: response.message,
					user: response.user || "failed"
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
