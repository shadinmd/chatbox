import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../ui/dialog"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { cn } from "@/lib/utils"
import { Icon } from "@iconify/react/dist/iconify.js"
import { isAxiosError } from "axios"
import { toast } from "sonner"
import Api from "@/services/Api"

interface Props {
	open: boolean,
	onOpenChange: (open: boolean) => void,
	chatId: string,
	children: React.ReactNode,
	className?: string
}

const ChatModal: React.FC<Props> = ({ open, onOpenChange, chatId, children, className }) => {

	const chat = useSelector((state: RootState) => state.chat.chats.find((e) => e?._id == chatId))
	const currentUser = useSelector((state: RootState) => state.user.user)
	const socket = useSelector((state: RootState) => state.socket.socket)

	const admin = chat?.members?.find((e) => e?.user?._id == currentUser?._id)?.role == "admin"
	const [addMemeberMode, setAddMemberMode] = useState(false)
	const [search, setSearch] = useState("")

	const nonMembers = currentUser.friends.filter((e) => !chat?.members?.some((member) => member.user._id != e._id))
	const filteredFriends = currentUser.friends.filter((e) => e.username.includes(search))

	const removeMember = async (user: string) => {
		try {
			const response = await Api.post("/chat/group/member/delete", { id: chatId, user })
			if (response.data.success)
				toast.success(response.data.message)
			else
				toast.error(response.data.message)
		} catch (error) {
			if (isAxiosError(error))
				if (error.response?.data.message)
					toast.error(error.response.data.message)
				else
					toast.error(error.message)
			else
				toast.error("something went wrong")
			console.log(error)
		}
	}

	const addMember = async (id: string) => {
		try {
			const response = await Api.post("/chat/group/member", { id: chat?._id, user: id, role: "user" })
			if (response.data.success)
				toast.success(response.data.message)
			else
				toast.error(response.data.message)
		} catch (error) {
			if (isAxiosError(error))
				if (error.response?.data.message)
					toast.error(error.response.data.message)
				else
					toast.error(error.message)
			else
				toast.error("something went wrong")
			console.log(error)
		}
	}

	const toggleAdmin = (id: string) => {
		try {

		} catch (error) {
			if (isAxiosError(error))
				if (error.response?.data.message)
					toast.error(error.response.data.message)
				else
					toast.error(error.message)
			else
				toast.error("something went wrong")
			console.log(error)
		}
	}

	const quitGroup = () => {
		try {

		} catch (error) {
			if (isAxiosError(error))
				if (error.response?.data.message)
					toast.error(error.response.data.message)
				else
					toast.error(error.message)
			else
				toast.error("something went wrong")
			console.log(error)
		}
	}

	const deleteGroup = () => {
		try {

		} catch (error) {
			if (isAxiosError(error))
				if (error.response?.data.message)
					toast.error(error.response.data.message)
				else
					toast.error(error.message)
			else
				toast.error("something went wrong")
			console.log(error)
		}
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange} >
			<DialogTrigger className={cn("outline-none", className)}>
				{children}
			</DialogTrigger>
			<DialogContent className="flex flex-col gap-5 bg-white p-10 max-w-none h-[80%] w-[80%] text-custom-blue border-none outline-none">
				<DialogHeader className="flex font-bold text-2xl flex-row justify-between items-center ">
					<p>Members</p>
					{
						admin &&
						<button onClick={() => setAddMemberMode(!addMemeberMode)} className="text-chat-green outline-none" >
							{
								addMemeberMode ?
									<Icon icon={"mdi:arrow-left"} className="font-extrabold text-4xl text-custom-red" /> :
									<Icon icon={"mdi:plus"} className="font-extrabold text-4xl text-green-500" />
							}
						</button>
					}
				</DialogHeader>
				{
					addMemeberMode ?
						<div className="flex flex-col gap-5 font-bold">
							<input
								type="text"
								onChange={e => setSearch(e.target.value)}
								placeholder="Search"
								className="rounded-lg px-3 py-2 bg-chat-black border-chat-blue border-2 outline-none text-black font-bold"
							/>
							<div className="flex flex-col gap-3">
								{
									filteredFriends.map((e, i) => (
										<div key={i} className="flex justify-between items-center px-3 py-1 bg-custom-blue rounded-lg text-white" >
											<p className="text-lg ">{e.username}</p>
											<div className="flex gap-2">
												<button onClick={() => addMember(e._id)}>
													<Icon icon={"typcn:plus"} className="text-chat-green text-2xl" />
												</button>
											</div>
										</div>
									))
								}
							</div>

						</div> :
						<div className="flex items-start justify-center w-full h-full overflow-auto">
							<div className="flex w-full flex-col font-bold gap-3">
								{
									chat?.members?.map((e, i) => (
										<div key={i} className="flex items-center justify-center gap-4 w-full">
											<p>{i + 1}</p>
											<div key={i} className={`flex text-xl w-full justify-between items-center px-3 py-2 ${e.role == "user" ? "bg-custom-blue" : "bg-custom-red"} text-white rounded-lg`}>
												<p>
													{e.user.username}
												</p>
												{
													admin && e.user._id != currentUser._id &&
													<div className="flex items-center gap-3">
														<button onClick={() => removeMember(e.user._id!)}>
															<Icon icon={"mdi:trash"} className={`text-chat-red text-2xl`} />
														</button>
														{
															e.role == "user" &&
															<button onClick={() => toggleAdmin(e.user._id!)}>
																<Icon icon={"bi:person-fill-up"} className={`text-chat-red text-2xl`} />
															</button>
														}
													</div>
												}
											</div>
										</div>
									))
								}
							</div>
						</div>
				}
			</DialogContent>
		</Dialog>
	)
}

export default ChatModal
