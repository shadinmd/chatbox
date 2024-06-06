import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const DBURL = process.env.DATABASE_URL as string

const connectDb = () => {
	try {
		mongoose.connect(DBURL)
		console.log("connected to database successfully");
	} catch (error) {
		console.log(error)
	}
}

export default connectDb
