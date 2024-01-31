"use client";
import Navbar from '@/components/Navbar'
import React, { useEffect } from 'react'
import gsap from "gsap"
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import { ArrowDown, Github, Globe, Instagram, LinkedinIcon } from 'lucide-react'
import Link from 'next/link';
gsap.registerPlugin(ScrollToPlugin)

const Home = () => {
	const hovertimeline = gsap.timeline({ repeat: -1 })

	useEffect(() => {
		hovertimeline.to("#arrow", {
			duration: 1,
			y: 10,
		}).to("#arrow", {
			duration: 1,
			y: 0,
		})
	}, [])

	const arrowScroll = () => {
		gsap.to(window, {
			scrollTo: "#second",
			duration: 1,
			ease: "Power2.easeOut"
		})
	}

	return (
		<div className="flex flex-col w-screen text-chat-blue bg-chat-black">
			<div className='flex flex-col text-chat-blue items-center justify-center h-screen w-full'>
				<Navbar />
				<div className='flex flex-col gap-10 items-center p-10 justify-center h-full w-full'>
					<div className='flex flex-col items-center gap-5'>
						<p className='text-7xl font-extrabold'>
							Chat Box
						</p>
						<p className='text-xl font-bold text-center px-20 pb-10'>
							Experience the future of communication with our chat app – end-to-end encrypted,
							offering seamless video calls, audio chats, file sharing, and more.
							Connect confidently in a secure and feature-rich environment.
						</p>
					</div>
					<div>
						<ArrowDown onClick={arrowScroll} id='arrow' className='cursor-pointer' />
					</div>
				</div>
			</div>
			<div id='second' className='flex flex-col items-center justify-evenly h-screen w-full'>
				<div className='flex flex-col items-center gap-5 px-20 text-center'>
					<p className='text-5xl font-extrabold'>Real-time Messaging</p>
					<p className='text-xl font-bold'>
						Experience the thrill of instant connectivity with our real-time messaging feature.
						Send and receive messages at the speed of thought,
						fostering seamless and dynamic conversations.
					</p>
				</div>
				<div className='flex flex-col gap-2 items-center text-center px-20'>
					<p className='text-5xl font-extrabold gap-5'>Multi-platform accessibility</p>
					<p className='text-xl font-bold'>
						Stay connected anytime, anywhere.
						Our chat application provides multi-platform accessibility,
						ensuring that you can chat effortlessly across various devices,
						be it on your computer, tablet, or smartphone.
					</p>
				</div>
			</div>
			<div className='flex flex-col items-center justify-evenly h-screen w-full'>
				<div className='flex flex-col gap-2 items-center text-center px-20'>
					<p className='text-5xl font-extrabold gap-5'>end-to-end encrypted</p>
					<p className='text-xl font-bold'>
						Your privacy is paramount. Benefit from end-to-end encryption,
						securing your messages from prying eyes.
						Enjoy confidential and secure communication,
						knowing that your data is shielded throughout the entire chat experience.
					</p>
				</div>
				<div className='flex flex-col gap-2 items-center text-center px-20'>
					<p className='text-5xl font-extrabold gap-5'>easy to use inerface</p>
					<p className='text-xl font-bold'>
						Navigate through your conversations with ease.
						Our chat application boasts an intuitive and easy-to-use interface,
						designed with simplicity in mind.
						Enjoy a user-friendly experience that prioritizes accessibility and functionality for users of all levels.
					</p>
				</div>
			</div>
			<footer className='flex py-5 justify-evenly bg-white items-center'>
				<div className='text-chat-blue text-4xl font-extrabold'>
					Chat box
				</div>
				<div className='flex flex-col gap-2 items-center'>
					<Link className='text-xl font-bold' href={"/"}>
						Home
					</Link>
					<Link className='text-xl font-bold' href={"/app/login"}>
						Login
					</Link>
					<Link className='text-xl font-bold' href={"/download"}>
						Download
					</Link>
				</div>
				<div className='grid grid-cols-2 gap-3'>
					<Link href={"https://www.linkedin.com/in/shadin-muhammed-69b004256/"} target='_blank'>
						<LinkedinIcon />
					</Link>
					<Link href={"https://shadinmhd.in"} target='_blank'>
						<Globe />
					</Link>
					<Link href={"https://github.com/shadinmhd"} target='_blank'>
						<Github />
					</Link>
					<Link href={"https://www.instagram.com/_sh.dn_/"} target='_blank'>
						<Instagram />
					</Link>
				</div>
			</footer>
		</div>
	)
}

export default Home
