"use client";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import { PuffLoader } from "react-spinners"
import authSlice from "@/redux/features/auth/authSlice";
import { getUser } from "@/redux/features/user/userActions";
import { useRouter } from "next/navigation";
import socketSlice from "@/redux/features/socket/socketSlice";
import { getAllMessages, getRequests } from "@/redux/features/chat/chatActions";
import { toast } from "sonner";

const Initializer = ({ children }: { children: React.ReactNode }) => {

	const router = useRouter()
	const dispatch: AppDispatch = useDispatch()
	const user = useSelector((state: RootState) => state.user.user)
	const [initialized, setInitializer] = useState(false)
	const socket = useSelector((state: RootState) => state.socket)
	const auth = useSelector((state: RootState) => state.auth.loggedIn)

	useEffect(() => {
		dispatch(socketSlice.actions.initiate())
	}, [])

	useEffect(() => {
		if (localStorage.getItem("token")) {
			dispatch(authSlice.actions.setLoggedIn(true))
		} else {
			setInitializer(true)
			router.push("/app/login")
		}
	}, [])

	useEffect(() => {
		if (auth) {
			dispatch(getUser())
			dispatch(getRequests())
			dispatch(getAllMessages())

			socket?.socket?.on("noti:recieve", (data) => {
				if (data.status = "success")
					toast.success(data.message, {position : "top-right"})
			})

			socket?.socket?.on("connect", () => {
				console.log("connected")
			})
		}
	}, [socket, auth])

	useEffect(() => {
		if (auth && user?._id && !initialized && socket.socket) {
			socket.socket.emit("initiate", { id: user._id })
			setInitializer(true)
		}
	}, [user])

	return (
		<>
			{
				initialized ?
					<>
						{children}
					</> :
					<Container>
						<PuffLoader color="#397FFF" />
					</Container>
			}
		</>
	)
}

export default Initializer
