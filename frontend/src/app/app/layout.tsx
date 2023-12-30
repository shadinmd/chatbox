"use client";
import Initializer from "@/components/Initializer"
import Sidebar from "@/components/Sidebar"

const Layout = ({ children }: { children: React.ReactNode }) => {

	return (
		<div className="flex gap-2 items-center justify-between w-screen h-screen p-2 bg-black">
			<Initializer>
				<Sidebar />
				{children}
			</Initializer>
		</div>
	)
}

export default Layout
