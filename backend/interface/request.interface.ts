interface IRequest {
	_id?: string,
	sender?: string,
	reciever?: string,
	status?: "ACCEPTED" | "REJECTED" | "WAITING",
	createdAt?: Date
}

export default IRequest
