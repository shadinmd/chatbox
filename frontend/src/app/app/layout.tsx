"use client";
import { useEffect } from "react";
import Initializer from "@/components/Initializer"
import Sidebar from "@/components/Sidebar"
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import authSlice from "@/redux/features/auth/authSlice";
import { getUser } from "@/redux/features/user/userActions";

const Layout = ({ children }: { children: React.ReactNode }) => {

	const router = useRouter()
	const dispatch: AppDispatch = useDispatch()

	useEffect(() => {
		if (localStorage.getItem("token")) {
			dispatch(authSlice.actions.setLoggedIn(true))
			dispatch(getUser())
		} else {
			router.push("/app/login")
		}
	}, [])

	return (
		<div className="flex gap-2 items-center justify-between w-screen h-screen p-2 bg-black overflow-x-hidden">
			<Initializer>
				<Sidebar />
				{children}
			</Initializer>
		</div>
	)
}

export default Layout
