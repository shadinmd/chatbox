import express, { NextFunction, Request, Response } from "express"
import UserRepository from "../repository/user.repository"
import AuthUsecase from "../usecases/auth.usecase"
import AuthController from "../controllers/auth.controller"
const router = express.Router()

const userRepository = new UserRepository()
const authUsecase = new AuthUsecase(userRepository)
const authController = new AuthController(authUsecase)

router.post("/login", (req: Request, res: Response, next: NextFunction) => authController.login(req, res))
router.post("/register", (req: Request, res: Response, next: NextFunction) => authController.register(req, res))

export default router
