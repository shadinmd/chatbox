"use client";
import Container from "@/components/Container"
import Api from "@/services/Api";
import { isAxiosError } from "axios";
import { debounce } from "lodash";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Users = () => {
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
		searchUsers()
	}, [search])

	const searchUsers = debounce(async () => {
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
	}, 500)

	return (
		<Container className="flex-col items-center gap-5 py-5  justify-center text-custom-blue">
			<div className="flex justify-between items-center w-full px-10">
				<h1 className="text-3xl font-bold text-left w-full">Users</h1>
				<div className="flex gap-2 font-bold">
					<div className="flex flex-col items-center">
						<div className="bg-custom-blue rounded-full h-[30px] w-[30px]">
						</div>
						<p>user</p>
					</div>
					<div className="flex flex-col items-center">
						<div className="bg-custom-red rounded-full h-[30px] w-[30px]">
						</div>
						<p>admin</p>
					</div>
				</div>
			</div>
			<div className="flex justify-center items-center w-full px-10">
				<input
					type="text"
					placeholder="Enter username.."
					onChange={((e) => setSearch(e.target.value))}
					className="px-2 py-1 w-full text-custom-black font-bold bg-chat-black border-custom-blue border rounded-lg"
				/>
			</div>
			<div className="flex flex-col gap-2 w-full px-10 font-bold items-center justify-start h-5/6">
				{
					users && users.map((e: any, i) => (
						<Link
							key={i}
							href={`/app/admin/users/${e._id}`}
							className={`flex justify-between w-full rounded-lg px-5 py-2 ${e.admin ? "bg-custom-red" : "bg-custom-blue"}  text-white`}
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
	)
}

export default Users 
