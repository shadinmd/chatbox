"use client";
import loginFormSchema from "@/models/loginFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link";
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux";
import { z } from "zod"
import authActions from "@/redux/features/auth/authActions"
import { AppDispatch } from "@/redux/store";
import { isFulfilled } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import { getUser } from "@/redux/features/user/userActions";

type className = string
type formType = z.infer<typeof loginFormSchema>

const inputStyle: className = "rounded-lg text-black px-2 py-2 focus:outline-none w-full"
const errorMessageStyle: className = "text-red-500"

const Login = () => {
	const dispatch: AppDispatch = useDispatch()
	const router = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<formType>({ resolver: zodResolver(loginFormSchema) })

	const submit = async (data: formType) => {
		const response = await dispatch(authActions.login(data))
		if (isFulfilled(response)) {
			router.push("/app/chat")
			dispatch(getUser())
		}
	}

	return (
		<div className="flex flex-col gap-7 items-center justify-center h-full w-full bg-chat-black text-white rounded-3xl">
			<div className="flex flex-col gap-7 h-full justify-center mb-8">
				<h1 className="text-5xl font-extrabold text-center">Login</h1>
				<form
					onSubmit={handleSubmit(submit)}
					className="flex flex-col gap-2 items-center justify-center"
				>
					<input
						{...register("email")}
						placeholder="Enter your email..."
						type="text"
						className={inputStyle}
					/>
					{
						errors.email && <p className={errorMessageStyle}>{errors.email.message}</p>
					}
					<input
						{...register("password")}
						placeholder="Enter your password..."
						type="password"
						className={inputStyle}
					/>
					{
						errors.password && <p className={errorMessageStyle}>{errors.password.message}</p>
					}
					<button
						type="submit"
						className="rounded-lg bg-blue-500 mt-2 w-full py-2 font-bold"
					>
						Login
					</button>
					<Link href={"/app/register"} >
						don't have an account? click here
					</Link>
				</form>
			</div>
		</div>
	)
}

export default Login
