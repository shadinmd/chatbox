"use client";
import Container from "@/components/Container"
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react"
import React, { useEffect, useState } from "react";
import moment from "moment";

const ChatUser = ({ params }: { params: { id: string } }) => {

	const chat = useSelector((state: RootState) => state.chat.messages)
	const user = useSelector((state: RootState) => state.user.user)
	const friend = user.friends.find((e) => e._id == params.id)
	const socket = useSelector((state: RootState) => state.socket.socket)
	const [message, setMessage] = useState("")
	const [file, setFile] = useState<File | null>(null)

	const [messages, setMessages] = useState<Array<any>>([])
	console.log(messages)

	useEffect(() => {
		const messages = chat.filter((e) => e.sender == params.id || e.reciever == params.id)
		setMessages(messages)
	}, [chat])

	useEffect(() => {
		socket?.on("message:recieve", (data) => {
			console.log(data)
			setMessages((prev) => [...prev, data])
		})
	}, [socket])

	const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const data: any = {}

		if (file) {
			data.file = {
				buffer: file,
				size: file.size,
				name: file.name
			}
			data.key = `shared/${user.username}/${file.name}`
			console.log(file)
		}

		data.text = message
		data.createdAt = Date.now()
		data.sender = user._id
		data.to = params.id
		data.username = user?.username

		if (message || file) {
			setMessages((prev) => [...prev, { ...data, file: file }])
			socket?.emit("message:send", data)
			setMessage("")
		}
	}

	return (
		<Container className="flex-col items-center justify-center p-5 overflow-y-auto">
			<div className="flex w-full h-20 gap-4 px-7 items-center justify-start">
				<div className="rounded-full bg-white h-12 w-12">
				</div>
				<p className="text-xl font-bold">
					{friend.username}
				</p>
			</div>
			<div className="flex justify-end p-5 items-start flex-col w-full max-h-full h-5/6 overflow-y-auto">
				{messages.map((e) => (
					<div className={`flex flex-col gap-1 ${e.sender == params.id ? "self-start" : "self-end"}`}>
						<div className="bg-chat-blue p-2 rounded-lg">
							{
								e.file &&
								<div className="flex gap-2 items-center justify-center p-2 bg-chat-black rounded-lg">
									<Icon className="text-xl" icon="ic:round-download" />
									<p>{e?.file?.name}</p>
								</div>
							}
							<p className=" text-lg font-bold">
								{e.text}
							</p>
						</div>
						<p className={`opacity-50 text-sm ${e.sender == params.id ? "self-start" : "self-end"}`}>
							{moment(e.createdAt).format("dd MM yyyy")}</p>
					</div>
				))}
			</div>
			<form onSubmit={sendMessage} className="flex px-3 gap-2 items-center justify-center w-full h-20">
				<input type="text" onChange={(e) => setMessage(e.target.value)}
					value={message}
					placeholder="Enter message... "
					className="w-full items-center text-black h-12 focus:outline-none p-2 rounded-lg"
				/>
				<input type="file" className="hidden" id="file" onChange={(e) => setFile(e?.target?.files![0])} />
				<label htmlFor="file" className="bg-chat-blue p-3 rounded-lg cursor-pointer hover:text-5xl">
					<Icon className="text-2xl" icon="akar-icons:attach" />
				</label>
				<button type="submit" className="bg-chat-blue p-3 rounded-lg">
					<Icon className="text-2xl" icon="fa-solid:paper-plane" />
				</button>
			</form>
		</Container>

	)
}

export default ChatUser
