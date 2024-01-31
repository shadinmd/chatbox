import { isAxiosError } from "axios"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../ui/dialog"
import React from "react"
import { toast } from "sonner"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogTitle } from "@radix-ui/react-dialog"

interface Props {
	children: React.ReactNode
}

const ChangePassword: React.FC<Props> = ({ children }) => {

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<formType>({ resolver: zodResolver(formSchema) })

	const onSubmit = () => {
		try {

		} catch (error) {
			if (isAxiosError(error))
				if (error.response?.data.message)
					toast.error(error.response.data.message)
				else
					toast.error(error.message)
			else
				toast.error("something went wrong")
			console.log(error)
		}
	}

	return (
		<Dialog>
			<DialogTrigger className="flex items-start outline-none">
				{children}
			</DialogTrigger>
			<DialogContent className="bg-chat-black text-white outline-none">
				<DialogHeader className="text-white font-extrabold text-xl">
					<DialogTitle>
						Change Password
					</DialogTitle>
				</DialogHeader>
				<form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
					<input
						{...register("password")}
						type="password"
						placeholder="password"
						className="px-3 py-1 text-black outline-none rounded-lg"
					/>
					{errors.password && <p className="text-red-500">{errors.password.message}</p>}
					<input
						{...register("confirmPassword")}
						type="password"
						placeholder="Confirm password"
						className="px-3 py-1 text-black outline-none rounded-lg"
					/>
					{errors.password && <p className="text-red-500">{errors.password.message}</p>}
					<button className="rounded-lg px-3 py-1 bg-black text-white" type="submit">
						Submit
					</button>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default ChangePassword

const formSchema = z.object({
	password: z.string().min(5, { message: "password need minimum 5 characters" }),
	confirmPassword: z.string()
}).superRefine(({ password, confirmPassword }, ctx) => {
	if (password != confirmPassword) {
		ctx.addIssue({
			code: "custom",
			message: "passwords don't match",
			path: ["confirmPassword"]
		})
	}
})

type formType = z.infer<typeof formSchema>
