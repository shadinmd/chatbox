"use client";
import { useState } from "react"
import Container from "../Container"
import { Icon } from "@iconify/react"
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";

const ChatSideBar = () => {

	const [search, setSearch] = useState("")
	const friends = useSelector((state: RootState) => state?.user?.user?.friends)

	return (
		<Container className="flex-col bg-black gap-2 w-5/12">
			<Container className="h-24 justify-center items-center w-full px-5">
				<Icon className="text-4xl text-chat-blue font-bold" icon="ic:round-search" />
				<input
					type="text"
					placeholder="Search username.."
					className="rounded-lg focus:outline-none w-full h-full bg-chat-black px-2 py-1"
					onChange={(e) => setSearch(e.target.value)}
				/>
			</Container>
			<Container className="flex-col h-full gap-5 px-5 py-5 justify-start">
				{
					friends ?
						friends.map((e, i) => (
							<Link key={i} href={`/app/chat/${e._id}`} className="flex w-full items-center font-bold text-lg gap-3">
								<div className="rounded-full bg-white h-10 w-10">
									<img src={e.image || ""} className="h-full w-full" alt="" />
								</div>
								<p>
									{e?.username}
								</p>
							</Link>
						)) :
						<p>no friends</p>
				}
			</Container>
		</Container>
	)
}

export default ChatSideBar
