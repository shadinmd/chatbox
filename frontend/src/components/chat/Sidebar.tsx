"use client";
import { useEffect, useState } from "react"
import Container from "../Container"
import { Icon } from "@iconify/react"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Link from "next/link";
import NewGroup from "./NewGroup";
import { getChats } from "@/redux/features/chat/chatActions";
import parseTime from "@/utils/timeParser";
import { usePathname } from "next/navigation";

const ChatSideBar = () => {

	const dispatch: AppDispatch = useDispatch()
	const [newGroupModal, setNewGroupModal] = useState(false)
	const [search, setSearch] = useState("")
	const pathName = usePathname()
	const [selectedChat, setSelectedChat] = useState("")
	const [groupInitiated, setGroupInitiated] = useState(false)
	const [sortedChats, setSortedChats]= useState()

	const chats = useSelector((state: RootState) => state.chat.chats)
	const currentUser = useSelector((state: RootState) => state.user.user)
	const socket = useSelector((state: RootState) => state.socket.socket)

	useEffect(() => {
		dispatch(getChats())
	}, [currentUser])

	useEffect(() => {
		setSelectedChat(pathName.split("/").pop()!)
	}, [pathName])

	useEffect(() => {
		if (chats.length > 0 && !groupInitiated) {
			const groups = chats.filter((e) => e.group)
			socket?.emit("groups:init", { groups })
			setGroupInitiated(true)
		}
		
	}, [chats])

	return (
		<Container className="flex-col bg-black w-5/12">
			<Container className="h-24 justify-center bg-custom-dark-grey items-center w-full px-5">
				<Icon className="text-4xl text-custom-blue font-bold" icon="ic:round-search" />
				<input
					type="text"
					placeholder="Search username.."
					className="rounded-lg focus:outline-none w-full text-black h-full bg-custom-dark-grey px-2 py-1"
					onChange={(e) => setSearch(e.target.value)}
				/>
				<div className="flex items-center justify-center">
					<NewGroup open={newGroupModal} onOpenChange={setNewGroupModal} />
				</div>
			</Container>
			<Container className="flex-col h-full justify-start bg-custom-dark-grey">
				{
					chats.length > 0 ?
						chats.map((e, i) => (
							e.group ?
								<Link href={`/app/chat/${e?._id}`} key={i} className={`flex ${selectedChat == e._id ? "bg-custom-grey" : "bg-custom-dark-grey"}  text-custom-blue p-3 w-full justify-between items-center ${selectedChat == e._id && "border-l-2"}  border-custom-red`}>
									<div className="flex items-center gap-3">
										<div>
											<Icon icon={"mdi:account-group"} className="text-custom-blue text-3xl" />
										</div>
										<div className="flex flex-col gap-1">
											<p className="font-bold">
												{e.groupName}
											</p>
											<p className="text-xs text-custom-blue opacity-60">
												{e.latestMessage || "no new messages"}
											</p>
										</div>
									</div>
									{
										e.latestMessage &&
										<p className="text-xs text-custom-blue">
											{parseTime(e.latestMessageTime!)}
										</p>
									}
								</Link> :
								<Link href={`/app/chat/${e?._id}`} key={i} className={`flex ${selectedChat == e._id ? "bg-custom-grey" : "bg-custom-dark-grey"}  text-custom-blue p-3 w-full justify-between items-center ${selectedChat == e._id && "border-l-2"}  border-custom-red`} >
									<div className="flex gap-4">
										<div className={`h-10 w-10 rounded-full bg-white ${e?.members?.find((item) => item?.user?._id != currentUser?._id)?.user?.online ? "outline" : ""}  outline-green-500`}>
											<img src={e?.members?.find((item) => item?.user?._id != currentUser?._id)?.user?.image} className="rounded-full" />
										</div>
										<div className="flex flex-col gap-1">
											<p className="font-bold">
												{e?.members?.find((item) => item?.user?._id != currentUser?._id)?.user?.username}
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
						)) :
						<Link href={"/app/search"} className="text-custom-blue h-full flex flex-col items-center justify-center">
							<Icon icon={"ion:person-add"} className="text-5xl" />
							discover friends to chat with
						</Link>
				}
			</Container>
		</Container >
	)
}

// <Container className="h-20">
// 	<NewGroup open={newGroupModal} onOpenChange={setNewGroupModal} />
// </Container>
export default ChatSideBar
