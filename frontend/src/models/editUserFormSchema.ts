import { z } from "zod";

const editUserFormSchema = z.object({
	username: z
		.string()
		.refine((e) => !/\s/.test(e), { message: "username contains space" })
	,
	email: z.string().email("email invalid"),
	bio: z.string()
})

export default editUserFormSchema
