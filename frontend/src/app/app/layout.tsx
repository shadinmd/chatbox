"use client";
import Initializer from "@/components/Initializer"
import Sidebar from "@/components/Sidebar"

const Layout = ({ children }: { children: React.ReactNode }) => {

	return (
		<div className="flex items-center justify-between w-screen h-screen">
			<Initializer>
				<Sidebar />
				{children}
			</Initializer>
		</div>
	)
}

export default Layout
