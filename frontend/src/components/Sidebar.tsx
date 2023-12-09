'use client';
import { useEffect } from "react";
import { Icon } from "@iconify/react"
import Link from "next/link"
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Sidebar = () => {
	const user = useSelector((state: RootState) => state.user)
	const auth = useSelector((state: RootState) => state.auth)
	useEffect(() => {

	}, [])

	return (
		<div className="flex flex-col items-center justify-between h-full bg-chat-black py-10 px-5 rounded-3xl">
			<div className="flex flex-col gap-6">
				<Link href="/app/profile">
					<Icon className="text-chat-blue h-9 w-9" icon={"mdi:person"}></Icon>
				</Link>
				<Link href="/app/chat">
					<Icon className="text-chat-green h-9 w-9" icon={"mdi:chat"}></Icon>
				</Link>
				<Link href="/app/call">
					<Icon className="text-chat-violet h-9 w-10" icon="solar:phone-bold" />
				</Link>
				<Link href="/app/search">
					<Icon className="text-chat-green h-9 w-10" icon="ion:person-add" />
				</Link>
				<Link href="/app/settings/account">
					<Icon className="text-chat-blue h-9 w-9" icon={"mdi:gear"}></Icon>
				</Link>
				{
					auth.loggedIn &&
					user?.user?.admin &&
					<Link href="/app/admin">
						<Icon className="text-chat-red h-9 w-9" icon={"eos-icons:admin"}></Icon>
					</Link>
				}
			</div>
			<div>
				<Link href="/">
					<Icon className="text-chat-blue h-9 w-9" icon={"mdi:home"}></Icon>
				</Link>
			</div>
		</div>
	)
}

export default Sidebar
