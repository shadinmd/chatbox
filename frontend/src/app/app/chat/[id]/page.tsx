"use client";
import Container from "@/components/Container"
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react"
import React, { useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";
import { toast } from "sonner";
import pako from "pako"
import axios from "axios";
import { Videotape } from "lucide-react";
import ChatMenu from "@/components/chat/ChatMenu";

const s3Url = "https://chatbox-files.s3.ap-south-1.amazonaws.com"

const ChatUser = ({ params }: { params: { id: string } }) => {

	const chat = useSelector((state: RootState) => state?.chat?.messages)
	const user = useSelector((state: RootState) => state?.user?.user)
	const friend = user?.friends?.find((e) => e._id == params.id)
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
			setFile(null)
		}
	}

	const changeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		const selectedFile = e?.target?.files![0]
		const maxsize = 5 * 1024 * 1024
		if (selectedFile.size > maxsize) {
			toast.error("file size limit 5mb")
		} else {
			setFile(selectedFile)
		}
	}

	return (
		<Container className="flex-col items-center justify-center p-5 gap-2">
			<div className="flex w-full h-20 gap-4 px-7 items-center justify-between">
				<div className="flex gap-4 items-center">
					<div className="rounded-full bg-white h-12 w-12">
						{
							friend?.image ?
								<img src={friend.image} className="h-full w-full rounded-full" alt="" /> :
								<div className="h-full w-full rounded-full bg-white" ></div>
						}
					</div>
					<p className="text-xl font-bold">
						{friend?.username}
					</p>
				</div>
				<div className="flex gap-3 items-center">
					<Link href="/app/call?video=false">
						<Icon className="text-chat-green h-9 w-10" icon="solar:phone-bold" />
					</Link>
					<Link href="/app/call?video=true">
						<Icon className="text-chat-green h-9 w-10" icon="majesticons:video" />
					</Link>
					<ChatMenu />
				</div>
			</div>
			<div id="chat-div" className=" p-5 w-full items-center justify-end h-full overflow-y-auto">
				<div className="flex flex-col" >
					{messages.map((e, i) => (
						<div key={i} className={`flex flex-col gap-1 w-max ${e.sender == params.id ? "self-start" : "self-end"}`}>
							<div className="bg-chat-blue p-2 rounded-lg">
								{
									e.file &&
									<Link href={e.file.url ? e.file.url : `${s3Url}/${e.file.key}`} /* onClick={() => downloadAndDecompress(e.file)} */
										className="flex gap-2 items-center justify-center p-2 bg-chat-black rounded-lg">
										<Icon className="text-xl" icon="ic:round-download" />
										<p>{e?.file?.name}</p>
									</Link>
								}
								<p className=" text-lg font-bold">
									{e.text}
								</p>
							</div>
							<p className={`opacity-50 text-sm ${e.sender == params.id ? "self-start" : "self-end"}`}>
								{moment(e.createdAt).format("dd MM yyyy HH:mm")}</p>
						</div>
					))}
				</div>
			</div>
			<form onSubmit={sendMessage} className="flex px-3 gap-2 items-center justify-center w-full h-20">
				<div className="flex flex-col w-full items-center justify-center relative">
					{
						file &&
						<div className="flex gap-2 p-2 rounded-lg items-center justify-center text-white bg-black absolute self-end -top-12 z-20">
							{
								`selected: ${file.name}`
							}
							<button type="button" onClick={(e) => { setFile(null) }}>
								<Icon icon="maki:cross" className="text-chat-red" />
							</button>
						</div>
					}
					<input type="text" onChange={(e) => setMessage(e.target.value)}
						value={message}
						placeholder="Enter message... "
						className="w-full items-center text-black h-12 focus:outline-none p-2 rounded-lg"
					/>
				</div>
				<input type="file" multiple={false} className="hidden" id="file" onChange={changeFile} />
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
