import createServer from "./configs/server"
import connectDb from "./configs/database"

import authRoute from "./routes/auth.route"
import { Request, Response } from "express"

const app = createServer()
connectDb()

// routes
app.use("/auth", authRoute)

app.get("/", (req: Request, res: Response) => {
	res.redirect("https://shadinmhd.in")
})

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`server listening http://localhost:${PORT}`)
})
