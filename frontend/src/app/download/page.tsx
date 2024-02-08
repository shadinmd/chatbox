"use client"
import Navbar from "@/components/Navbar"
import { Icon } from "@iconify/react"

const Download = () => {
	return (
		<div className="flex flex-col items-center justify-between h-screen w-screen">
			<Navbar />
			<div className="flex flex-col pb-20 gap-10 items-center justify-center h-full w-full">
				<div className="flex flex-col items-center justify-center">
					<p className="text-6xl text-custom-blue font-extrabold">Download</p>
					<p className="text-xl font-bold text-custom-blue">
						Desktop apps are in developement and will be launched soon
					</p>
				</div>
				<div className="grid grid-cols-3 items-center justify-center gap-20 text-custom-blue">
					<div className="flex flex-col gap-2 items-center justify-center font-bold">
						<div className="bg-custom-red p-10 rounded-xl h-full w-full">
							<Icon className={"text-7xl"} icon={"devicon:windows8"} />
						</div>
						<div className="flex flex-col items-center gap-2">
							<p>Windows</p>
							<p>coming soon</p>
						</div>
					</div>

					<div className="flex flex-col gap-2 items-center font-bold">
						<div className="bg-custom-red p-10 rounded-xl h-full w-full">
							<Icon className={"text-7xl"} icon={"devicon:linux"} />
						</div>
						<div className="flex flex-col items-center gap-2">
							<p>Linux</p>
							<p>coming soon</p>
						</div>
					</div>

					<div className="flex flex-col gap-2 items-center font-bold">
						<div className="bg-custom-red p-10 rounded-xl h-full w-full">
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
