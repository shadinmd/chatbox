import express from "express"
import AdminController from "../controllers/admin.controller"
import AdminUsecase from "../usecases/admin.usecase"
const router = express.Router()

const adminUsecase = new AdminUsecase()
const adminController = new AdminController(adminUsecase)

router.route("/user")
	.get()
	.post()

export default router
