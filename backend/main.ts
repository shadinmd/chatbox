import createServer from "./configs/server"
import connectDb from "./configs/database"

import authRoute from "./routes/auth.route"

const app = createServer()
connectDb()

// routes
app.use("/auth", authRoute)

app.get("/", (req: any, res: any) => {
	res.send({
		message: "hello world"
	})
})

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`server listening http://localhost:${PORT}`)
})
