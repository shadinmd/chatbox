import express, { Request, Response } from "express"
import UserUsecase from "../usecases/user.usecase"
import UserRepository from "../repository/user.repository"
import UserController from "../controllers/user.controller"
import authorizationMiddleware from "../middlewares/authorizatoin.middleware"
import { profileUpload } from "../middlewares/upload.middleware"
const router = express.Router()

const userRepository = new UserRepository()
const userUsecase = new UserUsecase(userRepository)
const userController = new UserController(userUsecase)

router.route("/")
	.get(authorizationMiddleware,(req: Request, res: Response) => userController.getUserDetails(req, res))
	.put(authorizationMiddleware, profileUpload.single("image"),(req: Request, res: Response) => userController.edit(req, res))

export default router