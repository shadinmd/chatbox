import express, { Request, Response } from "express"
import ChatController from "../controllers/chat.controller"
import ChatUsecase from "../usecases/chat.usecase"
import MessageRepository from "../repository/message.repository"
import RequestRepositroy from "../repository/request.repository"
import JwtRepository from "../repository/jwt.repository"
const router = express()


const messageRepository = new MessageRepository()
const requestRepository = new RequestRepositroy()
const jwtRepository = new JwtRepository()
const chatUsecase = new ChatUsecase(messageRepository, requestRepository)
const chatController = new ChatController(chatUsecase, jwtRepository)

router.route("/")
	.get((req: Request, res: Response) => chatController.getAllMessages(req, res))

router.route("/requests")
	.get((req: Request, res: Response) => chatController.getAllRequest(req, res))

router.route("/conversation/:id")
	.get((req: Request, res: Response) => chatController.getConversation(req, res))

export default router
