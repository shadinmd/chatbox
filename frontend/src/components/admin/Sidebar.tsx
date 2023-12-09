import Link from "next/link"
import Container from "../Container"
import { usePathname } from "next/navigation"

const AdminSideBar = () => {
	const path = usePathname()
	const current = (path.split("/")[3])

	return (
		<Container className="flex-col justify-start py-20 gap-10 w-1/3">
			<h1 className="text-5xl font-bold">Admin</h1>
			<div className="flex text-2xl font-bold flex-col gap-5">
				<Link className={current != undefined ? "opacity-50" : ""} href="/app/admin">
					Overview
				</Link>
				<Link className={current != "users" ? `opacity-50` : ""} href="/app/admin/users">
					Users
				</Link>
			</div>
		</Container>
	)
}

export default AdminSideBar
