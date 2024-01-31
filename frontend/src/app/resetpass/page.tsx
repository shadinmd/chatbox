"use client"
import Navbar from "@/components/Navbar"
import { zodResolver } from "@hookform/resolvers/zod"
import { isAxiosError } from "axios"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const ResetPass = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<formType>({ resolver: zodResolver(formSchema) })

	const onSubmit = (data: formType) => {
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
		<div className="flex flex-col items-center justify-between text-white w-screen h-screen bg-chat-black">
			<Navbar />
			<div className="flex flex-col gap-10 pb-10 h-full w-full items-center justify-center">
				<div className="flex flex-col gap-2 items-center justify-center">
					<p className='text-5xl font-bold'>
						Reset Password
					</p>
					<p>
						Enter your new password
					</p>
				</div>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 items-center justify-center">
					<input
						{...register("password")}
						type="password"
						placeholder="Password"
						className="rounded-lg text-black px-3 py-1 outline-none"
					/>
					{errors.password && <p className="text-red-500">{errors.password.message}</p>}
					<input
						{...register("confirmPassword")}
						type="password"
						placeholder="Confirm password"
						className="rounded-lg text-black px-3 py-1 outline-none"
					/>
					{errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
					<button className="font-bold w-full bg-black rounded-lg px-3 py-1" type="submit">
						Reset
					</button>
					<Link href={"/app/login"}>
						go back to login?
					</Link>
				</form>
			</div>
		</div>
	)
}

export default ResetPass

const formSchema = z.object({
	password: z.string().min(5, { message: "password can't be short than 5 characters" }),
	confirmPassword: z.string()
}).superRefine(({ password, confirmPassword }, ctx) => {
	if (password != confirmPassword) {
		ctx.addIssue({
			code: "custom",
			message: "passowrds don't match",
			path: ["confirmPassword"]
		})
	}
})

type formType = z.infer<typeof formSchema>
