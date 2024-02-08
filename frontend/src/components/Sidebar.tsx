'use client';
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react"
import Link from "next/link"
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { usePathname } from "next/navigation";

const Sidebar = () => {

	const user = useSelector((state: RootState) => state.user)
	const auth = useSelector((state: RootState) => state.auth)
	const path = usePathname()
	const [currentPage, setCurrentPage] = useState("")

	useEffect(() => {
		setCurrentPage(path.split("/").includes("chat") ? "chat" : path.split("/").pop()!)
	}, [path])

	return (
		<div className="flex flex-col items-center justify-between h-full bg-custom-blue py-10 px-5">
			<div className="flex text-white flex-col gap-6">
				<Link href="/app/profile">
					<Icon className={`h-9 w-9 ${currentPage == "profile" && "text-custom-red"}`} icon={"mdi:person"}></Icon>
				</Link>
				<Link href="/app/chat">
					<Icon className={`h-9 w-9 ${currentPage == "chat" && "text-custom-red"}`} icon={"mdi:chat"}></Icon>
				</Link>
				<Link href="/app/search">
					<Icon className={`h-9 w-9 ${currentPage == "search" && "text-custom-red"}`} icon="ion:person-add" />
				</Link>
				<Link href="/app/settings/account">
					<Icon className={`h-9 w-9 ${(currentPage == "account" || currentPage == "info") && "text-custom-red"}`} icon={"mdi:gear"}></Icon>
				</Link>
				{
					auth.loggedIn &&
					user?.user?.admin &&
					<Link href="/app/admin/users">
						<Icon className={`h-9 w-9 ${currentPage == "users" && "text-custom-red"}`} icon={"eos-icons:admin"}></Icon>
					</Link>
				}
			</div>
			<div>
				<Link href="/">
					<Icon className="h-9 w-9 text-white" icon={"mdi:home"}></Icon>
				</Link>
			</div>
		</div>
	)
}

// <Link href="/app/calls">
// 	<Icon className="text-chat-violet h-9 w-10" icon="solar:phone-bold" />
// </Link>

export default Sidebar
