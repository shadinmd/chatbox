import express, { Request, Response } from "express"
import ChatController from "../controllers/chat.controller"
import ChatUsecase from "../usecases/chat.usecase"
import MessageRepository from "../repository/message.repository"
import UserRepository from "../repository/user.repository"
import RequestRepositroy from "../repository/request.repository"
const router = express()


const messageRepository = new MessageRepository()
const requestRepository = new RequestRepositroy()
const chatUsecase=  new ChatUsecase(messageRepository, requestRepository)
const chatController = new ChatController(chatUsecase)

router.route("/")
    .get((req: Request, res: Response) => chatController.getAllMessages(req,res))

router.route("/requests")
    .get((req:Request, res: Response) => chatController.getAllRequest(req,res) )

export default router
