"use client";
import Navbar from '@/components/Navbar'
import React from 'react'
import gsap from "gsap"
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import { Github, Globe, Instagram, LinkedinIcon } from 'lucide-react'
import Link from 'next/link';
import { Icon } from '@iconify/react/dist/iconify.js';
gsap.registerPlugin(ScrollToPlugin)

const Home = () => {

	return (
		<div className="flex flex-col w-screen text-chat-blue bg-chat-black">
			<div className='flex flex-col text-chat-blue items-center justify-center w-full'>
				<Navbar />
				<div className='flex flex-col gap-20 md:gap-40 items-center w-full pt-20 px-10 md:px-20 pb-32'>

					<div className='flex flex-col-reverse md:flex-row items-center'>
						<div className='flex flex-col gap-5 items-start'>
							<p className='text-5xl font-bold'>Chat Box</p>
							<p className='text-xl font-bold'>
								Experience the future of communication with our chat app – end-to-end encrypted,
								offering seamless video calls, audio chats, file sharing, and more.
								Connect confidently in a secure and feature-rich environment.
							</p>
						</div>
						<div className='flex items-center justify-center w-full p-5'>
							<Icon icon={"mdi:chat"} className='text-[10rem] text-custom-red' />
						</div>
					</div>

					<div className='flex flex-col md:flex-row items-center '>
						<div className='flex items-center justify-center w-full p-5'>
							<Icon icon={"material-symbols:devices"} className='text-[10rem] text-custom-red' />
						</div>
						<div className='flex flex-col gap-5 items-start'>
							<p className='text-5xl font-bold'>Multi-platform accessibility</p>
							<p className='text-xl font-bold'>
								Stay connected anytime, anywhere.
								Our chat application provides multi-platform accessibility,
								ensuring that you can chat effortlessly across various devices,
								be it on your computer, tablet, or smartphone.
							</p>
						</div>
					</div>

					<div className='flex flex-col-reverse md:flex-row items-center'>
						<div className='flex flex-col gap-5 items-start'>
							<p className='text-5xl font-bold'>Easy to use inerface</p>
							<p className='text-xl font-bold'>
								Navigate through your conversations with ease.
								Our chat application boasts an intuitive and easy-to-use interface,
								designed with simplicity in mind.
								Enjoy a user-friendly experience that prioritizes accessibility and functionality for users of all levels.
							</p>
						</div>
						<div className='flex items-center justify-center w-full p-5'>
							<Icon icon={"fluent:card-ui-20-filled"} className='text-[10rem] text-custom-red' />
						</div>
					</div>

					<div className='flex flex-col md:flex-row items-center'>
						<div className='flex items-center justify-center w-full p-5'>
							<Icon icon={"material-symbols:encrypted"} className='text-[10rem] text-custom-red' />
						</div>
						<div className='flex flex-col gap-5 items-start'>
							<p className='text-5xl font-bold'>End-to-end encrypted</p>
							<p className='text-xl font-bold'>
								Your privacy is paramount. Benefit from end-to-end encryption,
								securing your messages from prying eyes.
								Enjoy confidential and secure communication,
								knowing that your data is shielded throughout the entire chat experience.
							</p>
						</div>
					</div>

				</div>
				<footer className='flex py-5 justify-evenly bg-custom-blue text-white items-center w-full'>
					<div className='text-chat-blue text-4xl font-extrabold'>
						Chat box
					</div>
					<div className='flex flex-col gap-2 items-center'>
						<Link className='text-xl font-bold' href={"/"}>
							Home
						</Link>
						<Link className='text-xl font-bold' href={"/login"}>
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
		</div>
	)
}

export default Home
