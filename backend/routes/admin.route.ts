import express, { Request, Response } from "express"
import AdminController from "../controllers/admin.controller"
import AdminUsecase from "../usecases/admin.usecase"
import UserRepository from "../repository/user.repository"
import adminAuthorizationMiddleware from "../middlewares/adminAuth.middleware"
const router = express.Router()

const userRepository = new UserRepository()
const adminUsecase = new AdminUsecase(userRepository)
const adminController = new AdminController(adminUsecase)

router.route("/user")
	.get(adminAuthorizationMiddleware, (req: Request, res: Response) => adminController.getAllUsers(req, res))
	.post()

router.route("/user/:id")
	.get(adminAuthorizationMiddleware, (req: Request, res: Response) => adminController.getUserDetails(req, res))
	.put(adminAuthorizationMiddleware, (req: Request, res: Response) => adminController.editUser(req, res))

export default router
