import UserRepository from "../repository/user.repository";
import JwtRepository from "../repository/jwt.repository"
import BcryptRepository from "../repository/bcrypt.repository"

class AuthUsecase {
	private userRepository: UserRepository
	private jwtRepository: JwtRepository
	private bcryptRepostiroy: BcryptRepository

	constructor(userRepository: UserRepository, jwtRepository: JwtRepository, bcryptRepostiroy: BcryptRepository) {
		this.userRepository = userRepository
		this.jwtRepository = jwtRepository
		this.bcryptRepostiroy = bcryptRepostiroy
	}

	async register(id: string, email: string, username: string, password: string) {
		try {
			const response = await this.userRepository.create({ id, username, email, password })
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

			const token = await this.jwtRepository.encode(response.user?.id)
			result.data.token = token

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
}

export default AuthUsecase
