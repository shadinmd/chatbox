"use client"
import React, { FC } from 'react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useRouter } from 'next/navigation'

interface Props {
	chat: string,
	friend: string
}

const ChatMenu: FC<Props> = ({ chat, friend }) => {

	const socket = useSelector((state: RootState) => state.socket.socket)
	const user = useSelector((state: RootState) => state.user.user)
	const router = useRouter()

	const unfriend = () => {
		socket?.emit("chat:friend:unfriend", { chat, friend, id: user?._id, username: user?.username })
		router.push("/app/chat")
	}

	const block = () => {
		socket?.emit("chat:friend:block", { chat, friend, id: user?._id, username: user?.username })
		router.push("/app/chat")
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='outline-none'>
				<Icon className='text-3xl' icon="pepicons-pencil:dots-y" />
			</DropdownMenuTrigger>
			<DropdownMenuContent className='bg-white rounded-md text-custom-blue transition-all'>
				<DropdownMenuItem onClick={() => unfriend()} className='cursor-pointer'>
					Un friend
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => block()} className='cursor-pointer'>
					Block
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default ChatMenu
