"use client"
import Container from "@/components/Container"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import moment from "moment"

const Info = () => {
	const user = useSelector((state: RootState) => state.user.user)

	return (
		<Container className="flex flex-col gap-10 items-center justify-center py-20 text-custom-blue">
			<p className="font-extrabold text-3xl">
				Info
			</p>
			<div className="flex flex-col gap-2">
				<div>

				</div>
				<div className="flex gap-3 font-bold">
					<p>account created date: </p>
					<p>
						{moment(user?.createdAt).format("DD/MM/YYYY")}
					</p>
				</div>
				<div className="flex gap-3 font-bold">
					<p>last account update: </p>
					<p>
						{moment(user?.updatedAt).format("DD/MM/YYYY")}
					</p>
				</div>
				<div className="flex gap-1 font-bold">
					<p>friends: </p>
					<p>{user?.friends.length}</p>
				</div>
				<div className="flex gap-3 font-bold">
					<p>admin: </p>
					<p>
						{user?.admin ? "true" : "false"}
					</p>
				</div>
				<div className="flex gap-3 font-bold">
					<p>Last online</p>
					<p>{moment(user.lastOnline).format("DD/MM/YYYY")}</p>
				</div>
			</div>
		</Container >
	)
}

export default Info
