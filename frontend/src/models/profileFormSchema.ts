import { z } from "zod"
const profileFormSchema = z.object({
	username: z.string().min(3, { message: "username too short" }),
	email: z.string().email("enter a valid email"),
	bio: z.string().nullable(),
})

export default profileFormSchema