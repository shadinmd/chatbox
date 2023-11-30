"use client";
import Container from "@/components/Container"
import { editUser, getUser } from "@/redux/features/user/userActions";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import profileFormSchema from "@/models/profileFormSchema";
import { z } from "zod";

type className = string
type formType = z.infer<typeof profileFormSchema>

const inputStyle: className = "text-black focus:outline-none px-2 py-2 rounded-lg"

const Profile = () => {

	const dispatch: AppDispatch = useDispatch()
	const user = useSelector((state: RootState) => state.user)

	useEffect(() => {
		(async () => {
			console.log(user)
			setValue("username", user.user.username)
			setValue("email", user.user.email)
			setValue("bio", user.user.bio)
		})()
	}, [])

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<formType>({
		resolver: zodResolver(profileFormSchema),
		defaultValues: user.user
	})

	const submit = async (data: formType) => {
		dispatch(editUser({ ...data, _id: user.user._id }))
	}

	return (
		<Container>
			{
				user.loading ?
					<div>
						loading
					</div> :
					<form
						onSubmit={handleSubmit(submit)}
						className="flex flex-col gap-2"
					>
						<input
							{...register("username")}
							type="text"
							placeholder="username..."
							className={inputStyle}
						/>
						{errors.username && <p className="text-chat-red">{errors.username.message}</p>}
						<input
							{...register("email")}
							type="text"
							placeholder="email.."
							className={inputStyle}
						/>
						{errors.email && <p className="text-chat-red">{errors.email.message}</p>}
						<input
							{...register("bio")}
							type="text"
							placeholder="bio.."
							className={inputStyle}
						/>
						{errors.bio && <p className="text-chat-red">{errors.bio.message}</p>}
						<button
							className="rounded-lg bg-chat-blue py-1"
							type="submit"
						>
							Save
						</button>
					</form>
			}
		</Container>
	)
}

export default Profile
