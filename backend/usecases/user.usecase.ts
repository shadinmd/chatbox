import IUser from "../interface/user.interface"
import BcryptRepository from "../repository/bcrypt.repository"
import JwtRepository from "../repository/jwt.repository"
import S3Repository from "../repository/s3.repository"
import UserRepository from "../repository/user.repository"

class UserUsecase {
	private userRepository: UserRepository
	private s3Repostiroy: S3Repository
	private jwtRepository: JwtRepository
	private bcryptRepository: BcryptRepository

	constructor(userRepository: UserRepository, s3Repostiroy: S3Repository, jwtRepository: JwtRepository, bcryptRepository: BcryptRepository) {
		this.userRepository = userRepository
		this.s3Repostiroy = s3Repostiroy
		this.jwtRepository = jwtRepository
		this.bcryptRepository = bcryptRepository
	}

	async getUsers(search?: { id: string, name: string }) {
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

	async changePass(password: string, newPassword: string, id: string) {
		try {
			const user = await this.userRepository.findById(id)
			if (!user.user) {
				return {
					status: 400,
					data: {
						success: false,
						message: "user not found"
					}
				}
			}

			console.log(user.user)
			const passCompare = this.bcryptRepository.compare(password, user.user.password!)
			if (!passCompare) {
				return {
					status: 400,
					data: {
						success: false,
						message: "incorrect password"
					}
				}
			}

			const hashedPass = this.bcryptRepository.hash(newPassword)
			const response = await this.userRepository.changePass(hashedPass, id)

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
