import mongoose from "mongoose";
import IUser from "../interface/user";

const userSchema = new mongoose.Schema<IUser>({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	active: {
		type: Boolean,
		default: true
	},
	bio: {
		type: String
	},
	admin: {
		type: Boolean,
		default: false
	},
	image: {
		type: String
	},
	verified: {
		type: Boolean,
		default: false
	}
}, { timestamps: true })

const UserModel = mongoose.model("User", userSchema)
export default UserModel
