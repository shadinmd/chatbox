"use client";
import Container from "@/components/Container"

const Layout = ({ children }: { children: React.ReactNode }) => {

	return (
		<Container className="flex ">
			{children}
		</Container>
	)
}

export default Layout
