"use client";
import Container from "@/components/Container"
import AdminSideBar from "@/components/admin/Sidebar"
import Api from "@/services/Api";
import { Icon } from "@iconify/react/dist/iconify.js";
import { isAxiosError } from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const users = () => {
	const [users, setUsers] = useState<Array<any>>()
	const [search, setSearch] = useState("")

	useEffect(() => {
		(async () => {
			try {
				const response = await Api.get("/admin/user")
				if (response.data.success) {
					setUsers(response.data.users)
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

	useEffect(() => {
		(async () => {
			try {
				const response = await Api.get(`/admin/user?name=${search}`)
				if (response.data.success) {
					setUsers(response.data.users)
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
	}, [search])

	return (
		<Container className="w-full gap-2 bg-black flex items-center"  >
			<Container className="flex-col items-center gap-5 py-5 justify-center">
				<h1 className="text-3xl font-bold text-left w-full px-10">Users</h1>
				<div className="flex justify-center items-center w-full px-10">
					<input
						type="text"
						placeholder="Enter username.."
						onChange={((e) => setSearch(e.target.value))}
						className="px-2 py-1 w-full text-white bg-chat-black border-chat-blue border rounded-lg"
					/>
					<button type="button">
						<Icon className="text-chat-green text-5xl p-2" icon="ic:baseline-plus" />
					</button>
				</div>
				<div className="flex flex-col gap-2 w-full px-10 font-bold items-center justify-start h-5/6">
					{
						users && users.map((e: any) => (
							<Link
								href={`/app/admin/users/${e._id}`}
								className="flex justify-between w-full rounded-lg px-5 py-2 bg-chat-blue text-chat-black"
							>
								<p>
									{e.username}
								</p>
								<p>
									{e.email}
								</p>
							</Link>
						))
					}
				</div>
			</Container>
		</Container >
	)
}

export default users 
