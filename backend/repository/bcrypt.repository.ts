import bcrypt from "bcrypt"

class BcryptRepository {
	constructor() { }

	hash(payload: string) {
		const saltRound = 10
		const salt = bcrypt.genSaltSync(saltRound)
		const hash = bcrypt.hashSync(payload, salt)
		return hash
	}

	compare(data: string, hash: string): boolean {
		const result = bcrypt.compareSync(data, hash)
		return result
	}
}

export default BcryptRepository
