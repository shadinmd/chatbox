import express, { NextFunction, Request, Response } from "express"
import UserRepository from "../repository/user.repository"
import AuthUsecase from "../usecases/auth.usecase"
import AuthController from "../controllers/auth.controller"
import BcryptRepository from "../repository/bcrypt.repository"
import UuidRepository from "../repository/uuid.repository"
import JwtRepository from "../repository/jwt.repository"
import MailRepository from "../repository/mail.repository"
import CryptoRepository from "../repository/crypto.repository"

const router = express.Router()

const userRepository = new UserRepository()
const bcryptRepositoy = new BcryptRepository()
const uuidRepository = new UuidRepository()
const jwtRepository = new JwtRepository()
const mailRepository = new MailRepository()
const cryptoRepository = new CryptoRepository()

const authUsecase = new AuthUsecase(userRepository, bcryptRepositoy, uuidRepository, jwtRepository, cryptoRepository, mailRepository)
const authController = new AuthController(authUsecase)

router.post("/login", (req: Request, res: Response, next: NextFunction) => authController.login(req, res))
router.post("/register", (req: Request, res: Response, next: NextFunction) => authController.register(req, res))
router.route("/verify")
	.post((req: Request, res: Response) => authController.sendVerificationMail(req, res))
	.put((req: Request, res: Response) => authController.verifyEMail(req, res))
export default router
