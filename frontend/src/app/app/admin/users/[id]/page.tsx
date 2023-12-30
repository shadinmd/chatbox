"use client";
import Container from "@/components/Container"
import editUserFormSchema from "@/models/editUserFormSchema";
import { RootState } from "@/redux/store";
import Api from "@/services/Api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { isAxiosError } from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { z } from "zod"

type className = string
type formType = z.infer<typeof editUserFormSchema>

const inputStyle: className = "text-black focus:outline-none px-2 py-1 rounded-lg"


const User = ({ params }: { params: { id: string } }) => {

	const [user, setUser] = useState<any>()
	const currentUser = useSelector((state: RootState) => state.user)
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue
	} = useForm<formType>({ resolver: zodResolver(editUserFormSchema) })

	useEffect(() => {
		(async () => {
			try {
				const response = await Api.get(`/admin/user/${params.id}`)
				if (response.data.success) {
					console.log(response.data)
					setUser(response.data.user)
					setValue("username", response.data.user.username)
					setValue("email", response.data.user.email)
					setValue("bio", response.data.user.bio)
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
		})()
	}, [])

	const submit = async (data: formType) => {
		try {
			const response = await Api.put(`/admin/user/${params.id}`, data)
			if (response.data.success) {
				toast.success(response.data.message)
				console.log(response.data.user)
			}
			else {
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

	const cancel = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setValue("username", user.username)
		setValue("email", user.email)
		setValue("bio", user.bio)
	}

	const block = async () => {
		try {
			const response = await Api.put(`/admin/user/${params.id}`, { verified: !user.verified })
			if (response.data.success) {
				toast.success(response.data.message)
				setUser({ ...user, ["active"]: !user.active })
			}
			else {
				toast.error(response.data.message)
			}
		} catch (error) {
			if (isAxiosError(error)) {
				if (error.response?.data.message)
					toast.error(error.request.data.message)
				else
					toast.error(error.message)
			} else {
				console.log(error)
			}
		}
	}

	const admin = async () => {
		try {
			const response = await Api.put(`/admin/user/${params.id}`, { admin: !user.admin })
			if (response.data.success) {
				toast.success(response.data.message)
				setUser({ ...user, ["admin"]: !user.admin })
			}
			else {
				toast.error(response.data.message)
			}
		} catch (error) {
			if (isAxiosError(error)) {
				if (error.response?.data.message)
					toast.error(error.request.data.message)
				else
					toast.error(error.message)
			} else {
				console.log(error)
			}
		}
	}

	return (
		<Container className="p-10 gap-10">
			<Link
				href={"/app/admin/users"}
				className="text-chat-blue z-10 text-3xl absolute top-10 left-32"
			>
				<Icon icon="tabler:arrow-left" />
			</Link>
			<form
				onSubmit={(handleSubmit(submit))}
				className="flex flex-col gap-2 w-full h-full items-center justify-center"
			>
				<div className="w-full flex justify-between gap-2">
					<label>id: </label>
					<p>{params.id}</p>
				</div>

				{
					user &&
					<>
						<div className="w-full flex justify-between gap-2">
							<label>verified: </label>
							<p>{user.verified ? "verified" : "not verified"}</p>
						</div>

						<div className="w-full flex justify-between gap-2">
							<label>type: </label>
							<p>{user.admin ? "admin" : "user"}</p>
						</div>

						<div className="w-full flex justify-between gap-2">
							<label>active: </label>
							<p>{user.active ? "active" : "blocked"}</p>
						</div>
					</>
				}

				<div className="w-full flex justify-between gap-2">
					<label>username: </label>
					<input
						{...register("username")}
						type="text"
						placeholder="username"
						className={inputStyle}
					/>
				</div>
				{errors.username && <p className="text-chat-red">{errors.username.message}</p>}
				<div className="w-full flex justify-between">
					<label >email: </label>
					<input
						{...register("email")}
						type="text"
						placeholder="email"
						className={inputStyle}
					/>
				</div>
				{errors.email && <p className="text-chat-red">{errors.email.message}</p>}
				<div className="w-full flex justify-between gap-1">
					<label >bio: </label>
					<input
						{...register("bio")}
						type="text"
						placeholder="bio"
						className={inputStyle}
					/>
				</div>
				{errors.bio && <p className="text-chat-red">{errors.bio.message}</p>}
				<div className="w-full mt-2 flex gap-5 justify-end">
					<button
						className="px-2 py-1 bg-chat-red font-bold rounded-lg"
						type="button"
						onClick={cancel}
					>
						Cancel
					</button>
					<button
						className="px-2 py-1 bg-chat-blue font-bold rounded-lg"
						type="submit"
					>
						Save
					</button>
				</div>
			</form>
			<Container className="flex-col items-center gap-10 px-10 justify-center rounded-none border-s border-white">
				<div className="flex flex-col w-full gap-2">
					<h3 className="text-2xl font-bold">Admin</h3>
					<p className="opacity-60">Make this user an admin?</p>
					{
						(user && currentUser.user._id == params.id) ?
							<p className="text-chat-red">you cannot change your admin status</p> :
							<button
								onClick={admin}
								className="px-2 py-1 bg-chat-blue font-bold rounded-lg w-20"
							>
								Admin
							</button>
					}
				</div>
				<div className="flex flex-col w-full gap-2">
					<h3 className="text-2xl font-bold">Block</h3>
					<p className="opacity-60">block or unblock the current user?</p>
					{
						(user && currentUser.user._id == params.id) ?
							<p className="text-chat-red">you cannot block yourself</p> :
							<button
								onClick={block}
								className="px-2 py-1 bg-chat-red font-bold rounded-lg w-20"
							>
								Block
							</button>
					}
				</div>
			</Container>
		</Container>
	)
}

export default User 
