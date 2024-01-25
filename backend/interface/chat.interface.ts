interface IChat {
	groupName?: string,
	description?: string,
	latestMessage?: string,
	latestMessageTime?: Date,
	members?: string[]
	group?: boolean
}

export default IChat
