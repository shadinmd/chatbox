import mongoose from "mongoose";
import IOtp from "../interface/otp";

const otpSchema = new mongoose.Schema<IOtp>({
	user: {
		type: String,
		required: true
	},
	otp: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		expires: 180
	}
}, { timestamps: true })

const OtpModel = mongoose.model("Otp", otpSchema)
export default OtpModel
