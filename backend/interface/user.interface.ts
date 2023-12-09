interface IUser {
	_id?: string,
	id?: string,
	username?: string,
	password?: string,
	email?: string,
	image?: string,
	bio?: string,
	admin?: boolean,
	active?: boolean,
	verified?: boolean,
	blocked?: [],
	friends?: string[],
	settings?: {
		theme?: "DARK" | "LIGHT",
		icons?: {
			call?: string,
			chat?: string,
			settings?: string,
			home?: string
		}
	}
}

export default IUser
