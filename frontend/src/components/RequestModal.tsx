"use client";
import React from "react"
import Container from "./Container"
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { Icon } from "@iconify/react";

interface Props {
	isOpen: boolean,
	onClose: Function
}

const RequestModal: React.FC<Props> = ({ isOpen = false, onClose }) => {

	const socket = useSelector((state: RootState) => state.socket.socket)
	const currentUser = useSelector((state: RootState) => state.user.user)
	const requests = useSelector((state: RootState) => state.chat.requests)

	const accept = (id: string) => {
		try {
			socket?.emit("chat:friend:accept", { id, user: currentUser._id, username: currentUser.username })
			console.log("accepted")
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			{
				isOpen &&
				<Container className={`z-10 fixed top-0 left-0 rounded-none h-screen w-screen bg-[#ffffff56] ${isOpen ? "visible" : "hidden"}`}>
					<Container className="flex flex-col w-[80%] h-[80%] py-10 px-10">
						<div className="flex w-full">
							<h2 className="w-full">
								Requests
							</h2>
							<button className="justify-self-center" onClick={(e) => onClose()} >
								<Icon className="text-chat-red text-2xl" icon="octicon:x-12" />
							</button>
						</div>
						<Container className="flex justify-start flex-col p-10">
							{
								requests &&
								requests?.map((e, i) => (
									<div key={i} className="flex items-center justify-between text-black bg-chat-blue w-full rounded-lg px-4 py-3 font-bold">
										<p>
											{e?.sender?.username}
										</p>
										<div className="flex items-center gap-4">
											<Link className="flex gap-2 items-center" href={`/app/user/${e.sender?._id}`}>
												View
												<Icon className="text-lg" icon="ph:arrow-square-out-bold" />
											</Link>
											{
												e.status == "WAITING" ?
													<button onClick={(event) => accept(e?.sender?._id!)} className="bg-chat-green rounded-lg px-2 py-1">
														accept
													</button>
													:
													e.status == "ACCEPTED" ?
														<Link className="bg-chat-green rounded-lg px-2 py-1" href={`/app/chat/${e.sender?._id}`}>
															Chat
														</Link>
														: <p className="text-chat-red px-2 py-1">
															Rejected
														</p>
											}
										</div>
									</div>
								))
							}
						</Container>
					</Container>
				</Container>
			}
		</>
	)
}

export default RequestModal
