"use client";

import Link from "next/link";

const Navbar = () => {
	return (
		<header className="flex w-full bg-white h-20 px-20 items-center justify-between">
			<Link href="/" className="text-chat-blue text-2xl font-extrabold">
				ChatBox
			</Link>
			<div className="flex items-center justify-center gap-4 text-chat-blue font-bold text-base">
				<Link href="/app/chat" className="bg-chat-blue text-white px-4 py-2  rounded-lg">
					Get Started
				</Link>
			</div>
		</header>
	)
}

export default Navbar
