import UserRepository from "../repository/user.repository";
import BcryptRepository from "../repository/bcrypt.repository"
import UuidRepository from "../repository/uuid.repository";
import jwt from "jsonwebtoken"
import OtpRepository from "../repository/otp.repository";

class AuthUsecase {
	private userRepository: UserRepository
	private bcryptRepostiroy: BcryptRepository
	private uuidRepository: UuidRepository
	private otpRepository: OtpRepository

	constructor(userRepository: UserRepository, bcryptRepostiroy: BcryptRepository, uuidRepository: UuidRepository, otpRepository: OtpRepository) {
		this.userRepository = userRepository
		this.bcryptRepostiroy = bcryptRepostiroy
		this.uuidRepository = uuidRepository
		this.otpRepository = otpRepository
	}

	async register(data: { email: string, username: string, password: string }) {
		try {
			const id = this.uuidRepository.generateId()
			const hashedPassword = this.bcryptRepostiroy.hash(data.password)
			const response = await this.userRepository.create({ ...data, id, password: hashedPassword })
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

	async login(email: string, password: string) {
		try {
			const response = await this.userRepository.findByEmail(email)
			const result = {
				status: response.success ? 200 : 500,
				data: {
					success: response.success,
					message: response.message,
					token: ''
				}
			}
			if (!response.success) {
				return result
			}

			if (!this.bcryptRepostiroy.compare(password, response.user?.password!)) {
				result.status = 500
				result.data.success = false
				result.data.message = "incorrect email or password"
			}

			const token = jwt.sign(String(response.user?._id), process.env.JWT_SECRET as string)
			result.data.token = token!

			return result
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

	async createOtp(id: string) {
		try {
			const otp = Math.floor(Math.random() * 900000)
			const response = await this.otpRepository.create(otp.toString(), id)
			return {
				status: response.success ? 200 : 500,
				data: {
					success: response.success,
					message: response.message
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

	async verifyOtp(otp: string, id: string) {
		try {
			const response = await this.otpRepository.searchById(id)
			if (response.success) {
				if (otp == response.otp?.otp) {
					this.userRepository.update({ id, verified: true })
					return {
						status: 200,
						data: {
							success: response.success,
							message: response.message
						}
					}
				} else {
					return {
						status: 400,
						data: {
							success: false,
							message: "invalid/incorrect otp"
						}
					}
				}
			} else {
				return {
					status: 500,
					data: {
						...response
					}
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
}

export default AuthUsecase
