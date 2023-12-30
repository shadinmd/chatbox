"use client";
import Container from "@/components/Container"
import Api from "@/services/Api";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link"
import { Icon } from "@iconify/react"
import RequestModal from "@/components/RequestModal";

const Search = () => {
	const [users, setUsers] = useState<Array<any>>([])
	const [modal, setModal] = useState(false)
	const [search, setSearch] = useState("")

	useEffect(() => {
		(async () => {
			try {
				const { data } = await Api.get(`/user/users?name=${search}`)
				if (data.success) {
					setUsers(data.users)
					console.log(data.users)
				} else {
					toast.error(data.message)
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
		<Container className="px-10 flex-col gap-5">
			<RequestModal onClose={() => { setModal(false) }} isOpen={modal} />
			<div className="flex w-full gap-4">
				<input
					placeholder="Enter name to search.."
					className="rounded-lg border-chat-blue bg-chat-black px-2 border-2 h-10 w-full"
					onChange={((e) => setSearch(e.target.value))}
					type="text"
				/>
				<button onClick={(e) => setModal(true)}>
					<Icon icon="ion:mail-unread" className="text-3xl text-chat-green" />
				</button>
			</div>
			<div className="w-full h-5/6 max-h-full grid grid-cols-4 grid-rows-3 gap-2 p-2 overflow-y-auto">
				{
					users &&
					users.map((e, i) => (
						<Link
							key={i}
							href={`/app/user/${e._id}`}
							className="bg-black rounded-lg w-full h-72 flex flex-col gap-2 p-2 items-center justify-center"
						>
							{
								e.image ?
									<img src={e.image} className="h-56 w-56 rounded-lg" alt="" /> :
									<div className="h-full w-full rounded-lg bg-white"></div>
							}
							<p className="text-lg font-bold text-left w-full">{e.username}</p>
						</Link>
					))
				}
			</div>
		</Container>
	)
}

export default Search
