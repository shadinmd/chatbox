import express, { Request, Response } from "express"
import UserUsecase from "../usecases/user.usecase"
import UserRepository from "../repository/user.repository"
import UserController from "../controllers/user.controller"
import authorizationMiddleware from "../middlewares/authorization.middleware"
import upload from "../middlewares/upload.middleware"
import S3Repository from "../repository/s3.repository"
import JwtRepository from "../repository/jwt.repository"
import BcryptRepository from "../repository/bcrypt.repository"
const router = express.Router()

const userRepository = new UserRepository()
const s3Repositroy = new S3Repository()
const jwtRepository = new JwtRepository()
const bcryptRepository = new BcryptRepository()
const userUsecase = new UserUsecase(userRepository, s3Repositroy, jwtRepository, bcryptRepository)
const userController = new UserController(userUsecase, jwtRepository)

router.route("/")
	.get(authorizationMiddleware, (req: Request, res: Response) => userController.getCurrentUser(req, res))
	.put(authorizationMiddleware, upload.single("file"), (req: Request, res: Response) => userController.edit(req, res))

router.get("/users", authorizationMiddleware, (req: Request, res: Response) => userController.getUsers(req, res))
router.post("/changePass", authorizationMiddleware, (req: Request, res: Response) => userController.changePassword(req, res))

router.route("/:id")
	.get(authorizationMiddleware, (req: Request, res: Response) => userController.getUserDetails(req, res))


export default router
