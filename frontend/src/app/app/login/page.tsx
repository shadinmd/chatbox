"use client";
import loginFormSchema from "@/models/loginFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux";
import { z } from "zod"
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import Api from "@/services/Api";
import Link from "next/link";
import authSlice from "@/redux/features/auth/authSlice";
import { getUser } from "@/redux/features/user/userActions";
import { useSelector } from "react-redux";

type className = string
type formType = z.infer<typeof loginFormSchema>

const inputStyle: className = "rounded-lg text-black px-2 py-2 focus:outline-none w-full"
const errorMessageStyle: className = "text-red-500"

const Login = () => {

	const dispatch: AppDispatch = useDispatch()
	const router = useRouter()
	const socket = useSelector((state: RootState) => state.socket.socket)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<formType>({ resolver: zodResolver(loginFormSchema) })

	const submit = async (data: formType) => {
		try {
			const response = await Api.post("/auth/login", data)
			if (response.data.success) {
				console.log(response.data)
				localStorage.setItem("token", response?.data?.token)
				localStorage.setItem("email", data.email)
				dispatch(authSlice.actions.setLoggedIn(true))
				const { payload } = await dispatch(getUser())
				console.log(payload)
				socket?.emit("initiate", { id: payload._id })
				router.push("/app/chat")
			} else {
				toast.error(response.data.message)
			}
		} catch (error) {
			if (isAxiosError(error)) {
				if (error.response?.data.message)
					toast.error(error.response.data.message)
				else
					toast.error(error.message)
			} else {
				console.log(error)
			}
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
					<Link href={"/forgot"} >
						forgot password?
					</Link>
				</form>
			</div>
		</div>
	)
}

export default Login
