"use client";
import Navbar from '@/components/Navbar';
import Api from '@/services/Api';
import { isAxiosError } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { loadavg } from 'os';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const Verfiy = () => {

	const router = useRouter()
	const search = useSearchParams()
	const email = search.get("email")
	const token = search.get("token")
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		(async () => {
			try {
				if (token && email) {
					setLoading(true)
					const {data} = await Api.put("/auth/verify", { email, token })
					if(data.success){
						router.push("/app/chat")
				}else{
						toast.error(data.message)
					}
				}
				setLoading(false)
			} catch (error) {
				if (isAxiosError(error)) {
					if (error.response?.data.message)
					toast.error(error.response.data.message)
					else
					toast.error(error.message)
				} else {
					console.log(error)
				}
				setLoading(false)
			}
			})()
	})

	const resend = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		try {
			const { data } = await Api.post("/auth/verify", { email: localStorage.getItem("email") })
			if (data.success)
			toast.success("email send successfully")
			else
			toast.error(data.message)
		} catch (error) {
			if (isAxiosError(error)) {
				if (error.response?.data.message) {
					toast.error(error.response.data.message)
				} else {
					toast.error(error.message)
				}
			} else {
				console.log(error)
			}
		}
	}

	return (
		<div className='flex flex-col items-center justify-start h-screen w-screen bg-chat-black text-white'>
			<Navbar />
			<div className='flex flex-col gap-5 items-center justify-center text-center h-full w-full'>
				<h1 className='text-4xl font-bold'>Please verify your email</h1>
				<p className='text-xl'>
					We have sent you an email
				<br />
					please click the link in the email for verifying your email
				</p>
				<div className='flex flex-col gap-2'>
					<p>can't find the email?</p>
					<button disabled={loading} onClick={resend} className={` p-2 ${loading ? "bg-gray-500" : "bg-chat-blue" } font-bold rounded-lg`}>
						{
							loading ?
								"verifying..." :
							"resend"
						}
					</button>
				</div>
			</div>
		</div>
	)
}

export default Verfiy
