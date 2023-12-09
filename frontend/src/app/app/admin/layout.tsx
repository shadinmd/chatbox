"use client";
import Container from "@/components/Container"
import AdminSideBar from "@/components/admin/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {

	return (
		<Container className="flex ">
			<AdminSideBar />
			{children}
		</Container>
	)
}

export default Layout
