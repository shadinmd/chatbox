import mongoose from "mongoose";
import IUser from "../interface/user.interface";

const userSchema = new mongoose.Schema<IUser>({
	username: {
		type: String,
		required: true,
		unique: true
	},
	id: {
		type: String,
		required: true,
		unique: true
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
	friends: {
		type: Array<String>,
		default: [],
		ref: "User"
	},
	verified: {
		type: Boolean,
		default: false
	},
	verificationToken: {
		type: String
	}
}, { timestamps: true })

const UserModel = mongoose.model("User", userSchema)
export default UserModel
