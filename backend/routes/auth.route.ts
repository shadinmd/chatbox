import express, { NextFunction, Request, Response } from "express"
import UserRepository from "../repository/user.repository"
import AuthUsecase from "../usecases/auth.usecase"
import AuthController from "../controllers/auth.controller"
import JwtRepository from "../repository/jwt.repository"
import BcryptRepository from "../repository/bcrypt.repository"
const router = express.Router()

const userRepository = new UserRepository()
const jwtRepository = new JwtRepository()
const bcryptRepositoy = new BcryptRepository()
const authUsecase = new AuthUsecase(userRepository, jwtRepository, bcryptRepositoy)
const authController = new AuthController(authUsecase)

router.post("/login", (req: Request, res: Response, next: NextFunction) => authController.login(req, res))
router.post("/register", (req: Request, res: Response, next: NextFunction) => authController.register(req, res))

export default router
