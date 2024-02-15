import UserRepository from "../repository/user.repository";
import BcryptRepository from "../repository/bcrypt.repository"
import UuidRepository from "../repository/uuid.repository";
import CryptoRepositor from "../repository/crypto.repository"
import JwtRepository from "../repository/jwt.repository";
import CryptoRepository from "../repository/crypto.repository";
import MailRepository from "../repository/mail.repository"

class AuthUsecase {
	private userRepository: UserRepository
	private bcryptRepostiroy: BcryptRepository
	private uuidRepository: UuidRepository
	private jwtRepository: JwtRepository
	private cryptoRepository: CryptoRepositor
	private mailRepository: MailRepository

	constructor(
		userRepository: UserRepository,
		bcryptRepostiroy: BcryptRepository,
		uuidRepository: UuidRepository,
		jwtRepository: JwtRepository,
		cryptoRepository: CryptoRepository,
		mailRepository: MailRepository
	) {

		this.userRepository = userRepository
		this.bcryptRepostiroy = bcryptRepostiroy
		this.uuidRepository = uuidRepository
		this.jwtRepository = jwtRepository
		this.cryptoRepository = cryptoRepository
		this.mailRepository = mailRepository

	}

	async register(data: { email: string, username: string, password: string }) {
		try {
			const hashedPassword = this.bcryptRepostiroy.hash(data.password)
			const verificationToken = this.cryptoRepository.generateVerificationToken()
			const response = await this.userRepository.create({ ...data, password: hashedPassword, verificationToken })
			await this.mailRepository.sendVerificationMail(data.email, `${process.env.FRONTEND_URL}/verify?token=${verificationToken}&email=${data.email}`)

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
					user: response.user,
					token: ""
				}
			}
			if (!response.success) {
				return result
			}

			if (!this.bcryptRepostiroy.compare(password, response.user?.password!)) {
				result.status = 500
				result.data.success = false
				result.data.message = "incorrect email or password"
				return result
			}

			const token = this.jwtRepository.hash(String(response.user?._id))
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

	async sendVerificationMail(email: string) {
		try {
			const response = await this.userRepository.getVerificationToken(email)
			if (response.success && response.email && response.token) {
				await this.mailRepository.sendVerificationMail(response?.email, `${process.env.FRONTEND_URL}/verify?token=${response.token}&email=${response.email}`)
				return {
					status: 200,
					data: {
						success: true,
						message: "mail sent successfully"
					}
				}
			} else if (!response.email) {
				return {
					status: 500,
					data: {
						success: false,
						message: "email to provided"
					}
				}
			} else if (!response.token) {
				return {
					status: 500,
					data: {
						success: false,
						message: "failed to fetch user token"
					}
				}
			} else {
				return {
					status: 500,
					data: {
						success: false,
						message: "database error"
					}
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

	async verifyEmail(token: string, email: string) {
		try {
			const response = await this.userRepository.verifyEmail(token, email)
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
}

export default AuthUsecase
