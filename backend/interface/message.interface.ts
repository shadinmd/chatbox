interface IMessage {
	sender?: string,
	chat?: string,
	text?: string,
	createdAt?: Date,
	file?: string,
	read?: boolean,
	type?: "TEXT" | "AUDIO" | "FILE"
}

export default IMessage
