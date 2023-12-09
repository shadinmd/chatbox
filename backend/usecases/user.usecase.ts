import IUser from "../interface/user.interface"
import S3Repository from "../repository/s3.repository"
import UserRepository from "../repository/user.repository"
import jwt from "jsonwebtoken"

class UserUsecase {
	private userRepository: UserRepository
	private s3Repostiroy: S3Repository

	constructor(userRepository: UserRepository, s3Repostiroy: S3Repository) {
		this.userRepository = userRepository
		this.s3Repostiroy = s3Repostiroy
	}

	async getUsers(search?: { name: string }) {
		try {
			const response = await this.userRepository.findAllUsers(search)
			return {
				status: response.success ? 200 : 500,
				data: {
					success: response.success,
					message: response.message,
					users: response.users
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

	async currentUser(token: string) {
		try {
			console.log(token)
			const id = jwt.verify(token, process.env.JWT_SECRET as string)
			const response = await this.userRepository.findById(id as string)
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

	async getUserDetails(id: string) {
		try {
			const response = await this.userRepository.findById(id)
			return {
				status: response.success ? 200 : 500,
				data: {
					success: response.success,
					message: response.message,
					user: response.user
				}
			}
		} catch (error) {
			return {
				status: 500,
				data: {
					status: false,
					message: "server error"
				}
			}
		}
	}

	async edit(user: IUser, file?: Express.Multer.File) {
		try {
			const response = await this.userRepository.update(user)
			if (file) {
				const key = `profile/${user.username}.${file.originalname.split(".")[1]}`
				const uploadResponse = await this.s3Repostiroy.upload(file, key)
			}
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
