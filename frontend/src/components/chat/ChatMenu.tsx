import React from 'react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu'
import { Icon } from '@iconify/react/dist/iconify.js'

const ChatMenu = () => {

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='outline-none'>
				<Icon className='text-3xl' icon="pepicons-pencil:dots-y" />
			</DropdownMenuTrigger>
			<DropdownMenuContent className='bg-chat-black rounded-md text-white transition-all'>
				<DropdownMenuItem className='cursor-pointer'>
					Un friend
				</DropdownMenuItem>
				<DropdownMenuItem className='cursor-pointer'>
					Block
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default ChatMenu
