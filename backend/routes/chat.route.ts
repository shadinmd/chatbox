import express, { Request, Response } from "express"
import ChatController from "../controllers/chat.controller"
import ChatUsecase from "../usecases/chat.usecase"
import MessageRepository from "../repository/message.repository"
import RequestRepositroy from "../repository/request.repository"
import JwtRepository from "../repository/jwt.repository"
import ChatRepository from "../repository/chat.repository"
import authorizationMiddleware from "../middlewares/authorization.middleware"
const router = express()


const messageRepository = new MessageRepository()
const requestRepository = new RequestRepositroy()
const chatRepository = new ChatRepository()
const jwtRepository = new JwtRepository()
const chatUsecase = new ChatUsecase(messageRepository, requestRepository, chatRepository)
const chatController = new ChatController(chatUsecase, jwtRepository)

router.route("/")
	.get(authorizationMiddleware, (req: Request, res: Response) => chatController.getChats(req, res))

router.route("/messages/:id")
	.get(authorizationMiddleware, (req: Request, res: Response) => chatController.getAllMessages(req, res))

router.route("/group")
	.post(authorizationMiddleware, (req: Request, res: Response) => chatController.createGroup(req, res))

router.route("/group/member")
	.post(authorizationMiddleware, (req: Request, res: Response) => chatController.addMember(req, res))

router.route("/group/member/delete")
	.post(authorizationMiddleware, (req: Request, res: Response) => chatController.deleteMember(req, res))

router.route("/requests")
	.get((req: Request, res: Response) => chatController.getAllRequest(req, res))

router.route("/conversation/:id")
	.get((req: Request, res: Response) => chatController.getConversation(req, res))

export default router
