import createServer from "./configs/server"
import connectDb from "./configs/database"
import { Request, Response } from "express"

import authRoute from "./routes/auth.route"
import userRoute from "./routes/user.route"
import adminRoute from "./routes/admin.route"


const app = createServer()
connectDb()

// routes
app.use("/auth", authRoute)
app.use("/user", userRoute)
app.use("/admin", adminRoute)

app.get("/", (req: Request, res: Response) => {
	res.redirect("https://shadinmhd.in")
})

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`server listening http://localhost:${PORT}`)
})
