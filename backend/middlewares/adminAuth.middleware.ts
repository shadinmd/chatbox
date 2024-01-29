import { NextFunction, Request, Response } from "express"
import JwtRepository from "../repository/jwt.repository"
import UserRepository from "../repository/user.repository"

const jwtRepository = new JwtRepository()
const userRepository = new UserRepository()

const adminAuthorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { authorization } = req.headers
		if (!authorization) {
			res.status(401).send({
				success: false,
				message: "you are not authorized"
			})
			return
		}

		const id = jwtRepository.decode(authorization as string)
		const response = await userRepository.findById(id as string)

		if (!response.user?.active) {
			return res.status(403).send({
				success: false,
				message: "user has been blocked",
				error: "blocked"
			})
		}

		if (!response.user.verified) {
			return res.status(403).send({
				success: false,
				message: "user not verified",
				error: "verification"
			})
		}

		if (!response.user.admin) {
			return res.status(401).send({
				success: false,
				message: "you are not authorized",
				error: "unauthorized"
			})
		}

		next()

	} catch (error) {
		console.log(error)
		res.status(500).send({
			success: false,
			message: "server error"
		})
	}
}

export default adminAuthorizationMiddleware
