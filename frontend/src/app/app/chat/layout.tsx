import Container from "@/components/Container"
import ChatSideBar from "@/components/chat/Sidebar"
import React from "react"

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Container className="bg-black">
			<ChatSideBar />
			{children}
		</Container>
	)
}

export default Layout
