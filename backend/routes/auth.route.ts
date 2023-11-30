import express, { NextFunction, Request, Response } from "express"
import UserRepository from "../repository/user.repository"
import AuthUsecase from "../usecases/auth.usecase"
import AuthController from "../controllers/auth.controller"
import BcryptRepository from "../repository/bcrypt.repository"
import UuidRepository from "../repository/uuid.repository"
import OtpRepository from "../repository/otp.repository"
const router = express.Router()

const userRepository = new UserRepository()
const bcryptRepositoy = new BcryptRepository()
const uuidRepository = new UuidRepository()
const otpRepository = new OtpRepository()
const authUsecase = new AuthUsecase(userRepository, bcryptRepositoy, uuidRepository, otpRepository)
const authController = new AuthController(authUsecase)

router.post("/login", (req: Request, res: Response, next: NextFunction) => authController.login(req, res))
router.post("/register", (req: Request, res: Response, next: NextFunction) => authController.register(req, res))
router.route("/otp")
    .get((req: Request, res: Response) => authController.getOtp(req, res))
    .put((req: Request, res: Response) => authController.verifyOtp(req, res))
export default router
