import { NextFunction, Request, Response } from "express"
import JwtRepository from "../repository/jwt.repository"
import UserRpository from "../repository/user.repository"

const jwtRepository = new JwtRepository()
const userRepository = new UserRpository()

const authorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { authorization } = req.headers
		if (authorization) {
			const id = jwtRepository.decode(authorization! as string)
			const user = await userRepository.findById(id as string)

			if (!user.user?.active) {
				return res.status(403).send({
					success: false,
					message: "user has been blocked",
					error: "blocked"
				})
			}

			if (!user.user.verified) {
				return res.status(403).send({
					success: false,
					message: "user not verified",
					error: "verification"
				})
			}

			next()
		} else {
			return res.status(401).send({
				success: false,
				message: "you are not authorized"
			})
		}
	} catch (error) {
		console.log(error)
		res.status(500).send({
			success: false,
			message: "error authorizing user"
		})
	}
}

export default authorizationMiddleware
