"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
	const router = useRouter()
	const getStarted = () => {
		if (localStorage.getItem("token")) {
			router.push("/app/chat")
		} else {
			router.push("/app/login")
		}
	}

	return (
		<header className="flex w-full bg-chat-black h-20 px-20 items-center justify-between">
			<Link href="/" className="text-chat-blue text-2xl font-extrabold">
				ChatBox
			</Link>
			<div className="flex items-center justify-center gap-4 text-chat-blue font-bold text-base">
				<Link href={"/download"} className="text-chat-blue bg-black rounded-lg px-4 py-2">
					Download
				</Link>
				<button onClick={getStarted} className="bg-chat-blue text-white px-4 py-2  rounded-lg">
					Get Started
				</button>
			</div>
		</header>
	)
}

export default Navbar
