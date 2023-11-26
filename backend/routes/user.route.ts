import express, { Request, Response } from "express"
import UserUsecase from "../usecases/user.usecase"
import UserRepository from "../repository/user.repository"
import UserController from "../controllers/user.controller"
const router = express.Router()

const userRepository = new UserRepository()
const userUsecase = new UserUsecase(userRepository)
const userController = new UserController(userUsecase)

router.route("/")
	.get((req: Request, res: Response) => userController.getUserDetails(req, res))
	.put((req: Request, res: Response) => userController.edit(req, res))

export default router
