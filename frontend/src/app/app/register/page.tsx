"use client";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import registerFormSchema, { registeFormType } from "@/models/registerFormSchema"
import Link from "next/link";
import authActions from "@/redux/features/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Navbar from "@/components/Navbar";
import { isFulfilled } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";

type className = string

const inputStyle: className = "rounded-lg text-black px-2 py-2 focus:outline-none"
const errorMessageStyle: className = "text-red-500"

const Register = () => {

	const dispatch: AppDispatch = useDispatch()
	const auth = useSelector((state: RootState) => state.auth)
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<registeFormType>({ resolver: zodResolver(registerFormSchema) })

	const submit = async (data: registeFormType) => {
		const response = await dispatch(authActions.register({ password: data.password, email: data.email, username: data.username }))
		if (isFulfilled(response)) {
			router.push("/app/login")
		}
	}

	return (
		<div className="flex flex-col gap-8 items-center justify-center h-full w-full bg-chat-black text-white rounded-3xl">
			<h1 className="text-5xl font-extrabold">Register</h1>
			<form
				onSubmit={handleSubmit(submit)}
				className="flex flex-col gap-3 justify-center"
			>
				<input
					{...register("username")}
					placeholder="Enter username..."
					type="text"
					className={inputStyle}
				/>
				{
					errors.username && <p className={errorMessageStyle}>{errors.username.message}</p>
				}

				<input
					{...register("email")}
					placeholder="Enter email..."
					type="text"
					className={inputStyle}
				/>
				{
					errors.email && <p className={errorMessageStyle}>{errors.email.message}</p>
				}

				<input
					{...register("password")}
					placeholder="Enter password..."
					type="password"
					className={inputStyle}
				/>
				{
					errors.password && <p className={errorMessageStyle}>{errors.password.message}</p>
				}

				<input
					{...register("confirmPassword")}
					placeholder="Confirm password..."
					type="password"
					className={inputStyle}
				/>
				{
					errors.confirmPassword && <p className={errorMessageStyle}>{errors.confirmPassword.message}</p>
				}
				<button disabled={auth.loading} type="submit" className="w-full py-2 mt-2 bg-blue-500 rounded-lg font-bold">
					Register
				</button>
				<Link href={"/app/login"}>
					all ready have an account? click here
				</Link>
			</form>
		</div>
	)
}

export default Register
