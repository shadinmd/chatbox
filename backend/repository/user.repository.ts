import IUser from "../interface/user.interface"
import UserModel from "../models/user.model"

class UserRepository {
	constructor() { }

	async create(user: IUser) {
		try {
			const response = await new UserModel(user).save()
			return {
				success: true,
				message: "user created"
			}
		} catch (error: any) {
			console.log(error)
			if (error.code == 11000) {
				const field = Object.keys(error.keyPattern)[0]
				return {
					success: false,
					message: `${field} all ready in use`
				}
			}
			return {
				success: false,
				message: "database error"
			}
		}
	}

	async addFriend(id: string, friendId: string) {
		try {
			const response = await UserModel.updateOne({ _id: id }, { $addToSet: { friends: friendId } })
			return {
				success: true,
				message: "friend added"
			}
		} catch (error) {
			return {
				success: false,
				message: "database error"
			}
		}
	}

	async update(user: IUser) {
		try {
			const response = await UserModel.findOneAndUpdate({ _id: user._id }, {
				$set:
				{
					email: user.email,
					bio: user.bio,
					username: user.username,
					admin: user.admin,
					active: user.active,
					image: user.image
				}
			}, { new: true })

			return {
				success: true,
				message: "user updated",
				user: response
			}
		} catch (error) {
			console.log(error)
			return {
				success: false,
				message: "database error"
			}
		}
	}

	async findByEmail(email: string) {
		try {
			const response = await UserModel.findOne({ email })
			if (!response) {
				console.log("no user found")
				return {
					success: false,
					message: "user not found",
				}
			}
			return {
				success: true,
				message: "user found",
				user: response
			}
		} catch (error) {
			console.log(error)
			return {
				success: false,
				message: "database error"
			}
		}
	}

	async findById(id: string) {
		try {
			const response = await UserModel.findOne({ _id: id }, { password: false }).populate({ path: "friends", select: "-password" })
			return {
				success: true,
				message: "fetched user",
				user: response
			}
		} catch (error) {
			console.log(error)
			return {
				success: false,
				message: "database error"
			}
		}
	}

	async findAllUsers(search?: { name: string }) {
		try {
			let query: any = {}
			if (search?.name) {
				query.username = { $regex: search.name, $options: "i" }
			}
			const response = await UserModel.find(query, { id: false, password: false })
			return {
				success: true,
				message: "fetched all users",
				users: response
			}
		} catch (error) {
			return {
				success: false,
				message: "database error"
			}
		}
	}

	async getVerificationToken(email: string) {
		try {
			const response = await UserModel.findOne({ email }, { verificationToken: 1, _id: 0, email: 1 })
			return {
				success: true,
				message: "token fetched",
				token: response?.verificationToken,
				email: response?.email
			}
		} catch (error) {
			console.log(error)
			return {
				success: false,
				message: "database error"
			}
		}
	}

	async verifyEmail(token: string, email: string) {
		try {
			const response = await UserModel.findOneAndUpdate({ email, verificationToken: token }, { $set: { verified: true }, /* $unset: { verificationToken: 1 }  */ })
			return {
				success: true,
				message: "fetched user token",
				token: response?.verificationToken
			}
		} catch (error) {
			return {
				success: false,
				message: "database error"
			}
		}
	}
}

export default UserRepository
