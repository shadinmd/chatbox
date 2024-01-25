"use client";
import { useEffect, useState } from "react"
import Container from "../Container"
import { Icon } from "@iconify/react"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Link from "next/link";
import NewGroup from "./NewGroup";
import { getChats } from "@/redux/features/chat/chatActions";
import moment from "moment";
import { parseTime } from "@/utils/timeParser";

const ChatSideBar = () => {

	const dispatch: AppDispatch = useDispatch()
	const [newGroupModal, setNewGroupModal] = useState(false)
	const [search, setSearch] = useState("")

	const socket = useSelector((state: RootState) => state.socket.socket)
	const chats = useSelector((state: RootState) => state.chat.chats)
	const currentUser = useSelector((state: RootState) => state.user.user)

	useEffect(() => {
		dispatch(getChats())
	}, [currentUser])

	useEffect(() => {
	}, [])

	return (
		<Container className="flex-col bg-black gap-2 w-5/12">
			<Container className="h-24 justify-center items-center w-full px-5">
				<Icon className="text-4xl text-chat-blue font-bold" icon="ic:round-search" />
				<input
					type="text"
					placeholder="Search username.."
					className="rounded-lg focus:outline-none w-full h-full bg-chat-black px-2 py-1"
					onChange={(e) => setSearch(e.target.value)}
				/>
			</Container>
			<Container className="h-20">
				<NewGroup open={newGroupModal} onOpenChange={setNewGroupModal} />
			</Container>
			<Container className="flex-col h-full gap-5 px-5 py-5 justify-start">
				{
					chats?.map((e, i) => (
						e.group ?
							<Link href={`/app/chat/${e?._id}`} key={i} className="flex w-full justify-between items-center gap-5 mb-1">
								<div className="flex gap-3">
									<div className="h-10 w-10 rounded-full bg-white">
										<img src={""} alt="" />
									</div>
									<div className="flex flex-col gap-1">
										<p className="font-bold">
											{e.groupName}
										</p>
										<p className="text-xs opacity-60">
											{e.latestMessage || "no new messages"}
										</p>
									</div>
								</div>
								{
									e.latestMessage &&
									<p className="text-xs">
										{parseTime(e.latestMessageTime!)}
									</p>
								}
							</Link> :
							<Link href={`/app/chat/${e?._id}`} key={i} className={`flex w-full justify-between items-center gap-5`} >
								<div className="flex gap-4">
									<div className={`h-10 w-10 rounded-full bg-white ${e.members?.find((item) => item.user?._id != currentUser?._id)?.user.online ? "outline" : ""}  outline-chat-green`}>
										<img src={e?.members?.find((item) => item.user?._id != currentUser?._id)?.user.image} alt="" />
									</div>
									<div className="flex flex-col gap-1">
										<p className="font-bold">
											{e.members?.find((item) => item.user._id != currentUser._id)?.user.username}
										</p>
										<p className="text-xs opacity-60">
											{e.latestMessage || "no new messages"}
										</p>
									</div>
								</div>
								{
									e.latestMessage &&
									<p className="text-xs">
										{parseTime(e.latestMessageTime!)}
									</p>
								}
							</Link>
					))
				}
			</Container>
		</Container >
	)
}

export default ChatSideBar
