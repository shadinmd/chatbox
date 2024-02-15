"use client";
import Container from "@/components/Container";
import chatSlice from "@/redux/features/chat/chatSlice";
import { IUser } from "@/redux/features/user/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Api from "@/services/Api";
import { Icon } from "@iconify/react"
import { isAxiosError } from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PuffLoader } from "react-spinners";
import { toast } from "sonner";

const User = ({ params }: { params: { id: string } }) => {

	const dispatch: AppDispatch = useDispatch()
	const currentUser = useSelector((state: RootState) => state.user.user)
	const socket = useSelector((state: RootState) => state.socket.socket)
	const requests = useSelector((state: RootState) => state.chat.requests)

	const [user, setUser] = useState<IUser>()
	const [friend, setFriend] = useState(false)
	const [loading, setLoading] = useState(true)
	const [requestRecieved, setRequestRecieved] = useState(false)
	const [requestSend, setRequestSend] = useState(false)
	const [blocked, setBlocked] = useState(false)

	useEffect(() => {
		if (requests) {
			if (requests.find((e) => e.sender?._id == params.id)) {
				setRequestRecieved(true)
			}
			if (requests.find((e) => e.reciever == params.id)) {
				setRequestSend(true)
			}
		}
	}, [requests, currentUser])

	useEffect(() => {
		const search = currentUser?.blocked?.find((e) => e?._id == params.id)
		if (search) {
			setBlocked(true)
		}
	}, [user, currentUser])

	useEffect(() => {
		(async () => {
			try {
				const { data } = await Api.get(`/user/${params.id}`)
				if (data.success) {
					setUser(data.user)
				} else {
					toast.error(data.message)
				}
			} catch (error) {
				if (isAxiosError(error)) {
					if (error.response?.data.message)
						toast.error(error.response.data.message)
					else
						toast.error(error.message)
				} else {
					console.log(error)
				}
			} finally {
				setLoading(false)
			}
		})()
	}, [])

	useEffect(() => {
		if (currentUser?.friends?.find((e) => e?._id == params.id)) {
			setFriend(true)
		}
	}, [currentUser])

	const requestFriend = async (e: React.MouseEvent<HTMLButtonElement>) => {
		try {
			e.preventDefault()
			const data = { to: params.id, sender: currentUser, status: "WAITING" }
			socket?.emit("chat:friend:request", data)
			dispatch(chatSlice.actions.appendRequest({ reciever: params.id, sender: currentUser, status: "WAITING" }))
			toast.success("request send")
			console.log("request send to ", params.id)
		} catch (error) {
			console.log(error)
		}
	}

	const accept = async (id: string) => {
		try {
			dispatch(chatSlice.actions.acceptRequest(id))
			socket?.emit("chat:friend:accept", { id: params.id, user: currentUser?._id, username: currentUser.username })
		} catch (error) {
			console.log(error)
		}
	}

	const cancelRequest = async (id: string) => {
		try {
			if (!id) {
				toast.error("somthing went wrong please reload and try again")
				return
			}
			dispatch(chatSlice.actions.deleteRequest(id))
			socket?.emit("chat:friend:cancel", { id, to: params.id })
			setRequestSend(false)
		} catch (error) {
			console.log(error)
		}
	}

	const Block = async (e: React.MouseEvent<HTMLButtonElement>) => {
		try {
			socket?.emit("chat:friend:block", { id: params.id })
		} catch (error) {
			console.log(error)
		}
	}

	const unBlock = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		try {
			socket?.emit("chat:friend:unblock", { id: params.id })
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Container className="flex-col gap-5 items-center justify-center text-custom-blue">
			<Link className="text-3xl font-bold absolute top-10 left-32" href="/app/search">
				<Icon className="text-custom-blue" icon="tabler:arrow-left" />
			</Link>

			{
				user && !loading ? <div className="flex flex-col items-center justify-center">
					<div className="flex items-center justify-center rounded-full bg-white h-40 w-40">
						{
							user.image ?
								<img src={user.image} className="w-full h-full rounded-full" alt="" /> :
								<div>
									<Icon icon="mdi:person" className="text-custom-red text-8xl" />
								</div>
						}
					</div>
					<div className="flex flex-col text-custom-blue items-center justify-center gap-2">
						<h1 className="text-4xl font-bold">{user.username}</h1>
						<p className="text-sm">#{user._id}</p>
						{
							user.bio != "undefined" &&
							<p>{user.bio}</p>
						}
					</div>
					{
						currentUser?._id != user?._id &&
						<div className="flex gap-5 items-center justify-center font-bold">
							{
								friend ?
									<Link className="px-4 py-2 rounded-lg bg-custom-red text-white" href={`/app/chat/`}>
										Message
									</Link>
									:
									blocked ?
										<button onClick={unBlock} className="px-4 py-2 rounded-lg bg-custom-red text-white">
											Un Block
										</button> :
										requestRecieved ?
											<button onClick={(e) => accept(requests.find((e) => e.sender?._id! == params.id)?._id!)} className="px-4 py-2 rounded-lg bg-custom-red text-white">
												accept
											</button> :
											requestSend ?
												<button onClick={(e) => cancelRequest(requests.find((e) => e.reciever == params.id)?._id!)} className="px-4 py-2 rounded-lg bg-custom-red text-white">
													Cancel Request
												</button> :
												<button onClick={requestFriend} className="px-4 py-2 rounded-lg bg-custom-red text-white">
													Request
												</button>
							}

						</div>
					}
				</div> :
					<PuffLoader className="border-chat-blue" color="#397FFF" />
			}
		</Container >
	)
}
// {
// 	!friend &&
// 		!requestSend &&
// 		< button onClick={Block} className="px-4 py-2 rounded-lg bg-custom-blue text-white">
// 			Block
// 		</button>
// }
export default User
