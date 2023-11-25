import IUser from "../interface/user"
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
		} catch (error) {
			console.log(error)
			return {
				success: false,
				message: "database error"
			}
		}
	}

	async update(user: IUser) {
		try {
			const response = await UserModel.updateOne({ _id: user._id }, { $set: { email: user.email } })
		} catch (error) {
			return {
				success: false,
				message: "database error"
			}
		}
	}

	async findByEmail(email: string) {
		try {
			const response = await UserModel.find({ email })
			return {
				success: true,
				message: "user found",
				user: response
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
