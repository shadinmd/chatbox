import Link from "next/link";

const Navbar = () => {
	return (
		<header className="flex w-full bg-custom-blue h-20 px-20 items-center justify-between">
			<Link href="/" className="text-white text-2xl font-extrabold">
				ChatBox
			</Link>
			<div className="flex items-center justify-center gap-4 text-chat-blue font-bold text-base">
				<Link href={"/download"} className="text-white hover:text-custom-red transition-all rounded-lg px-4 py-2">
					Download
				</Link>
				<Link href={localStorage.getItem("token") ? "/app/chat" : "/login"} className="bg-custom-red  text-white px-4 py-2  rounded-lg">
					Get Started
				</Link>
			</div>
		</header>
	)
}

export default Navbar
