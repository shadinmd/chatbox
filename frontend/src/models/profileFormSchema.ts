import { z } from "zod"
const profileFormSchema = z.object({
	username: z.string().min(3, { message: "username too short" }),
	email: z.string().email("enter a valid email"),
	bio: z.string().nullable(),
	image: z.custom<FileList>().transform((file) => file.length > 0 && file.item(0))
})

export default profileFormSchema