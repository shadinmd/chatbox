type UsecaseReturn<T extends {}> = {
	status: number,
	data: {
		success: boolean,
		message: string,
	} & T
}

export default UsecaseReturn
