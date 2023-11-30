import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

const authorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
	try {
		const { authorization } = req.headers
		if (authorization) {
			const id = jwt.verify(authorization! as string, process.env.JWT_SECRET as string)
			next()
		} else {
			return res.status(401).send({
				success: false,
				message: "you are not authorized authorized"
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