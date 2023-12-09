import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

const idFromToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = jwt.verify(req.headers.authorization!, process.env.JWT_SECRET as string)
        req.body = id
        next()
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message :"failed to parse id"
        })
    }
}