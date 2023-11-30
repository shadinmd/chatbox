"use client";
import { useDispatch } from "react-redux"
import Container from "@/components/Container"
import { AppDispatch } from "@/redux/store";
import authSlice from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";

const Settings = () => {

	const dispatch: AppDispatch = useDispatch()
	const router = useRouter()

	const logout = () => {
		dispatch(authSlice.actions.logout())
		router.push("/app/login")
	}

	return (
		<Container>
			<button className="bg-chat-red px-2 py-1 text-xl font-bold rounded-lg" onClick={logout}>
				Logout
			</button>
		</Container>
	)
}

export default Settings
