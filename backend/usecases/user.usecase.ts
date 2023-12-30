import IUser from "../interface/user.interface"
import JwtRepository from "../repository/jwt.repository"
import S3Repository from "../repository/s3.repository"
import UserRepository from "../repository/user.repository"

class UserUsecase {
	private userRepository: UserRepository
	private s3Repostiroy: S3Repository
	private jwtRepository: JwtRepository
	constructor(userRepository: UserRepository, s3Repostiroy: S3Repository, jwtRepository: JwtRepository) {
		this.userRepository = userRepository
		this.s3Repostiroy = s3Repostiroy
		this.jwtRepository = jwtRepository
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
			const id = this.jwtRepository.decode(token)
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
			user.image = `https://chatbox-files.s3.ap-south-1.amazonaws.com/profile/${user.username}.png`
			console.log(user.image)
			const response = await this.userRepository.update(user)
			if (file) {
				const key = `profile/${user.username}.${file.originalname.split(".")[1]}`
				const uploadResponse = await this.s3Repostiroy.uploadProfile(file, key)
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
