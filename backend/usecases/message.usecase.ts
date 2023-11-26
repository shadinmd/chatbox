import MessageRepository from "../repository/message.repository"

class MessageUsecase {
	private messageRepository: MessageRepository
	constructor(messageRepository: MessageRepository) {
		this.messageRepository = messageRepository
	}
}

export default MessageUsecase 
