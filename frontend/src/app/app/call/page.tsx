"use client"
import Container from '@/components/Container'
import { RootState } from '@/redux/store'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useSearchParams } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'

const Call = () => {

	const user = useSelector((state: RootState) => state.user.user)
	const videoRef = useRef(null)
	const params = useSearchParams()
	const videoParam = params.get("video")
	const [voice, setVoice] = useState(true)
	const [video, setVideo] = useState(true)

	return (
		<Container className='flex-col p-10 gap-10'>
			<div className='flex flex-col items-center justify-center w-full h-20'>
				<p>Call Ongoin...</p>
				<p>00:21</p>
			</div>
			<div className='grid grid-cols-2 gap-10 p-2 w-full h-full'>
				<div className='flex items-center justify-center bg-black h-full w-full rounded-lg'>
					<img className='h-56 w-56' src={user?.image} alt="" />
				</div>
				<div className='bg-black h-full w-full rounded-lg'>
				</div>
			</div>
			<div className='flex gap-10 items-center justify-center'>
				<button className='bg-chat-red text-black rounded-full p-2'>
					<Icon className='text-4xl' icon="fluent:call-end-20-filled" />
				</button>
				<button className='bg-white text-black rounded-full p-2' onClick={() => setVoice(!voice)}>
					{
						voice ?
							<Icon className='text-4xl' icon="bi:mic-mute-fill" /> :
							<Icon className='text-4xl' icon="bi:mic-fill" />
					}
				</button>
				<button className='bg-white text-black rounded-full p-2' onClick={() => setVideo(!video)}>
					{
						video ?
							<Icon className='text-4xl' icon="ph:video-camera-slash-fill" /> :
							<Icon className='text-4xl' icon="ph:video-camera-fill" />
					}
				</button>
			</div>
		</Container>
	)
}

export default Call
