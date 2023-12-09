"use client";
import Container from "@/components/Container";
import { RootState } from "@/redux/store";
import Api from "@/services/Api";
import { Icon } from "@iconify/react"
import { isAxiosError } from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PuffLoader } from "react-spinners";
import { toast } from "sonner";

const User = ({ params }: { params: { id: string } }) => {
	const [user, setUser] = useState<any>()
	const [friend, setFriend] = useState(false)
	const currentUser = useSelector((state: RootState) => state.user.user)
	const [loading, setLoading] = useState(true)
	const [request, setRequest] = useState(false)
	const socket = useSelector((state: RootState) => state.socket.socket)
	const requests = useSelector((state: RootState) => state.chat.requests)

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
		if (currentUser.friends.some((e) => e._id == params.id)) {
			setFriend(true)
		}
		else if (requests.some((e) => e.sender._id == params.id)) {
			setRequest(true)
		}
	}, [requests])

	const Request = async (e: React.MouseEvent<HTMLButtonElement>) => {
		try {
			e.preventDefault()
			socket?.emit("chat:request", { id: params.id })
			console.log("request send to ", params.id)
		} catch (error) {
			console.log(error)
		}
	}

	const accept = async (e: React.MouseEvent<HTMLButtonElement>) => {
		try {
			e.preventDefault()
			socket?.emit("chat:accept", { id: params.id })
		} catch (error) {
			console.log(error)
		}
	}

	const Block = async (e: React.MouseEvent<HTMLButtonElement>) => {
		try {
			socket?.emit("chat:block", { id: params.id })
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Container className="flex-col gap-5">
			<Link className="text-3xl font-bold absolute top-10 left-32" href="/app/search">
				<Icon className="text-chat-blue" icon="tabler:arrow-left" />
			</Link>

			{
				user && !loading ? <>
					<div className="rounded-full bg-white h-40 w-40">
						{
							user.image &&
							<img src="" className="w-full h-full" alt="" />
						}
					</div>
					<div className="flex flex-col items-center justify-center gap-2">
						<h1 className="text-4xl font-bold">{user.username}</h1>
						<p className="text-sm">#{user._id}</p>
						<p>{user.bio}</p>
					</div>
					{
						currentUser._id != user?._id &&
						<div className="flex gap-5 items-center justify-center font-bold">
							{
								friend ?
									<Link className="px-4 py-2 rounded-lg bg-chat-green" href={`/app/chat/${params.id}`}>
										Message
									</Link>
									:
									request ?
										<button onClick={accept} className="px-4 py-2 rounded-lg bg-chat-green">
											accept
										</button> :
										<button onClick={Request} className="px-4 py-2 rounded-lg bg-chat-blue">
											Request
										</button>
							}
							<button onClick={Block} className="px-4 py-2 rounded-lg bg-chat-red">
								Block
							</button>
						</div>
					}
				</> :
					<PuffLoader className="border-chat-blue" color="#397FFF" />
			}
		</Container>
	)
}

export default User
