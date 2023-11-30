import Container from "@/components/Container"
import AdminSideBar from "@/components/admin/Sidebar"

const Admin = () => {
	return (
		<Container className="w-full gap-2 bg-black flex items-center"  >
			<AdminSideBar />
			<Container>
				Nothing to show here
			</Container>
		</Container >
	)
}

export default Admin
