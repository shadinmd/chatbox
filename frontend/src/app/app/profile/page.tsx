"use client";
import Container from "@/components/Container"
import { editUser } from "@/redux/features/user/userActions";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import profileFormSchema from "@/models/profileFormSchema";
import { z } from "zod";
import { Icon } from "@iconify/react"

type className = string
type formType = z.infer<typeof profileFormSchema>

const inputStyle: className = "text-black focus:outline-none px-2 py-2 rounded-lg border-2 border-custom-blue"

const Profile = () => {

	const dispatch: AppDispatch = useDispatch()
	const user = useSelector((state: RootState) => state.user)
	const [file, setFile] = useState<File | null>(null)

	useEffect(() => {
		(async () => {
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
		const form = new FormData()
		form.append("username", data.username)
		form.append("email", data.email)
		form.append("bio", data.bio!)
		form.append("file", file || "no file")
		form.append("_id", user.user._id)
		dispatch(editUser(form))
	}

	const submitProfile = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log(file)
	}

	return (
		<Container>
			{
				user.loading ?
					<div>
						loading
					</div> :
					<div className="flex flex-col gap-10 items-center justify-center h-full w-full p-20">
						<div>
							<p className="text-6xl font-bold text-custom-blue">Profile</p>
						</div>
						<div className="flex items-center justify-center gap-10 h-full w-full">
							<form onSubmit={submitProfile} className="flex gap-10">
								<label htmlFor="select-image" className="h-60 w-60 rounded-full object-cover object-center">
									{
										file ?
											<img src={URL.createObjectURL(file)} className="h-full w-full rounded-full object-cover object-center" alt="" />
											: user.user.image ?
												<img src={user.user.image} className="h-full w-full rounded-full object-cover object-center" alt="" />
												:
												<div className="flex items-center justify-center h-full w-full rounded-full object-cover object-center cursor-pointer bg-custom-grey">
													<Icon icon="mdi:camera" className="text-black text-5xl" />
												</div>
									}
								</label>
								<input
									type="file"
									name="image"
									id="select-image"
									className={inputStyle}
									hidden={true}
									onChange={(e) => {
										if (e.target.files && e.target?.files?.length > 0) {
											setFile(e.target.files[0])
										}
									}}
								/>
							</form>
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
									className="rounded-lg bg-custom-red font-bold px-3 py-1"
									type="submit"
								>
									Save
								</button>
							</form>
						</div>
					</div>
			}
		</Container>
	)
}

export default Profile
