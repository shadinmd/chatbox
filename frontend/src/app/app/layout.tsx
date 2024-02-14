"use client";
import Initializer from "@/components/Initializer"
import Sidebar from "@/components/Sidebar"
import { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {

	useEffect(() => {
		console.log("initializer is here")
	}, [])

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
