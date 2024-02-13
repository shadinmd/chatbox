const parseMessage = (message: string, maxlength: number = 20): string => {
	if (message.length > maxlength) {
		return message.slice(0, maxlength - 3) + '...'
	}

	return message
}

export default parseMessage
