import UserRepository from "../repository/user.repository";

class AuthUsecase {
	private userRepository: UserRepository

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository
	}

	async register() {
		try {

		} catch (error) {

		}
	}

	async login() {
		try {

		} catch (error) {

		}
	}
}

export default AuthUsecase
