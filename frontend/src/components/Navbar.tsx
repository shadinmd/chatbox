import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {

	const router = useRouter()

	const getStarted = () => {
		if (localStorage.getItem("token")) {
			router.push("/app/chat")
		} else {
			router.push("/login")
		}
	}

	return (
		<header className="flex w-full bg-custom-blue h-20 px-20 items-center justify-between">
			<Link href="/" className="text-white text-2xl font-extrabold">
				ChatBox
			</Link>
			<div className="flex items-center justify-center gap-4 text-chat-blue font-bold text-base">
				<button onClick={() => getStarted()} className="bg-custom-red  text-white px-4 py-2  rounded-lg">
					Get Started
				</button>
			</div>
		</header>
	)
}

export default Navbar
