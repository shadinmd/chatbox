"use client";
import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Icon } from "@iconify/react";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import chatSlice, { IRequest } from "@/redux/features/chat/chatSlice";
import { Link } from "lucide-react";

const RequestModal: React.FC = () => {

	const dispatch: AppDispatch = useDispatch()
	const socket = useSelector((state: RootState) => state.socket.socket)
	const currentUser = useSelector((state: RootState) => state.user.user)
	const requests = useSelector((state: RootState) => state.chat.requests)

	const accept = (request: IRequest) => {
		try {
			socket?.emit("chat:friend:accept", { id: request.sender?._id!, user: currentUser._id, username: currentUser.username })
			dispatch(chatSlice.actions.acceptRequest(request?._id!))
			console.log("accepted")
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Dialog>
			<DialogTrigger className="outline-none">
				<Icon icon="ion:mail-unread" className="text-3xl text-custom-red" />
			</DialogTrigger>
			<DialogContent className="flex flex-col gap-2 h-96 w-full">
				<DialogHeader>
					<DialogTitle className="font-extrabold text-xl">
						Requests
					</DialogTitle>
				</DialogHeader>
				<div id="request-modal" className="flex items-start justify-center overflow-auto w-full h-full">
					<div className="flex flex-col gap-2 items-center justify-start w-full ">
						{requests.filter((e) => e.reciever == currentUser?._id && e.status == "WAITING").map((e, i) => (
							<div
								key={i}
								className="flex items-center justify-between w-full h-12 p-2 rounded-lg bg-custom-red"
							>
								<div className="">
									<p className="font-bold">
										{e.sender?.username}
									</p>
								</div>
								<div className="flex items-center">
									<div className="flex gap-2 items-center">
										<Link href={`/app/user/${e?.sender}`} className="bg-custom-blue text-white rounded-lg p-1">
											profile
										</Link>
										<button onClick={() => accept(e)} className="bg-custom-blue text-white rounded-lg p-1">
											accept
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default RequestModal
