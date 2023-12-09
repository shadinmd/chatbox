import createServer from "./configs/server"
import connectDb from "./configs/database"
import { Request, Response } from "express"
import configureSocket from "./configs/socket"
import http from "http"

import authRoute from "./routes/auth.route"
import userRoute from "./routes/user.route"
import adminRoute from "./routes/admin.route"
import chatRoute from "./routes/chat.route"

const app = createServer()
const server = new http.Server(app)
const io = configureSocket(server)
connectDb()

// routes
app.use("/auth", authRoute)
app.use("/user", userRoute)
app.use("/admin", adminRoute)
app.use("/chat", chatRoute)

app.get("/", (req: Request, res: Response) => {
	res.redirect("https://shadinmhd.in")
})

const PORT = process.env.PORT
server.listen(PORT, () => {
	console.log(`server listening http://localhost:${PORT}`)
})
