"use client"
import Navbar from "@/components/Navbar"
import { Icon } from "@iconify/react"

const Download = () => {
	return (
		<div className="flex flex-col items-center justify-between h-screen w-screen">
			<Navbar />
			<div className="flex flex-col pb-20 gap-10 items-center justify-center h-full w-full bg-chat-black">

				<div className="grid grid-cols-3 items-center justify-center gap-20">
					<div className="flex flex-col gap-2 items-center justify-center text-white font-bold">
						<div className="bg-[#ffffff55] p-10 rounded-xl h-full w-full">
							<Icon className={"text-7xl"} icon={"devicon:windows8"} />
						</div>
						<div className="flex flex-col items-center gap-2">
							<p>Windows</p>
							<p>coming soon</p>
						</div>
					</div>

					<div className="flex flex-col gap-2 items-center text-white font-bold">
						<div className="bg-[#ffffff55] p-10 rounded-xl h-full w-full">
							<Icon className={"text-7xl"} icon={"devicon:linux"} />
						</div>
						<div className="flex flex-col items-center gap-2">
							<p>Linux</p>
							<p>coming soon</p>
						</div>
					</div>

					<div className="flex flex-col gap-2 items-center text-white font-bold">
						<div className="bg-[#ffffff55] p-10 rounded-xl h-full w-full">
							<Icon className={"text-7xl"} style={{ color: "white" }} icon={"wpf:macos"} />
						</div>
						<div className="flex flex-col items-center gap-2">
							<p>Mac Os</p>
							<p>coming soon</p>
						</div>
					</div>

				</div>
			</div>
		</div>
	)
}

export default Download
