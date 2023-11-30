import { z } from "zod"

const registerFormSchema = z.object({
	username: z.string().min(3, { message: "username too short" }),
	email: z.string().email("invalid email"),
	password: z.string().min(4, { message: "password too short" }),
	confirmPassword: z.string()
}).superRefine(({ password, confirmPassword }, ctx) => {
	if (password !== confirmPassword) {
		ctx.addIssue({
			code: "custom",
			message: "password doesn't match",
			path: ["confirmPassword"]
		})
	}
})


export type registeFormType = z.infer<typeof registerFormSchema>
export default registerFormSchema
