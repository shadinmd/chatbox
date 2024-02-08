interface IChat {
	_id?: string,
	groupName?: string,
	description?: string,
	latestMessage?: string,
	latestMessageTime?: Date,
	newMessages?: number,
	members?: string[]
	group?: boolean
}

export default IChat
