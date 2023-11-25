import jwt from "jsonwebtoken"
class JwtRepository {
	constructor() { }
	async encode(payload: string) {
		const token = jwt.sign(payload, process.env.JWT_SECRET as string)
		return token
	}

	async decode(token: string) {
		const payload = jwt.verify(token, process.env.JWT_SECRET as string)
		return payload
	}

}

export default JwtRepository
