import crypto from "crypto"

class CryptoRepository {
	constructor() { }

	generateVerificationToken = () => {
		return crypto.randomBytes(48).toString("hex")
	}
}

export default CryptoRepository
