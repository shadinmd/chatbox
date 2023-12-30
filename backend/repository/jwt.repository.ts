import jwt, { JwtPayload } from "jsonwebtoken";

class JwtRepository {
	constructor() { }

	hash(payload: Object | string): string {
		const token = jwt.sign(payload, process.env.JWT_SECRET as string)
		return token
	}

	decode(token: string): JwtPayload | string {
		const payload = jwt.verify(token, process.env.JWT_SECRET as string)
		return payload
	}
}

export default JwtRepository
