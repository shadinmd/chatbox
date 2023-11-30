import Link from "next/link"
import Container from "../Container"

const AdminSideBar = () => {
	return (
		<Container className="flex-col justify-start py-20 gap-5 w-1/3">
			<h1 className="text-5xl font-bold">Admin</h1>
			<div className="flex text-2xl font-bold flex-col ">
				<Link href="/app/admin">
					Overview
				</Link>
				<Link href="/app/admin/users">
					Users
				</Link>
			</div>
		</Container>
	)
}

export default AdminSideBar
