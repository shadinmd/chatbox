import express from "express"
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

const createServer = () => {
	const app = express()

	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))
	app.use(morgan("dev"))
	app.use(cors())

	return app
}

export default createServer
