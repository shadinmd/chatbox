import CallSidebar from "@/components/call/Sidebar"
import React from "react"


const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex w-full h-full gap-2">
			<CallSidebar />
			{children}
		</div>
	)
}

export default Layout
