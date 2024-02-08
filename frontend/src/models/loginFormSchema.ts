import { z } from "zod";

const loginFormSchema = z.object({
	email: z.string()
		.email("Enter a valid email")
		.refine((e) => !/\s/.test(e), { message: "username cannot contain spaces" })
	,
	password: z.string().min(1, { message: "please enter your password" })
})

export type loginFormType = z.infer<typeof loginFormSchema>
export default loginFormSchema
