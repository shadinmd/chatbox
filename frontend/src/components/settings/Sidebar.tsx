'use client';
import React from 'react'
import Container from '@/components/Container'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SettingsSidebar = () => {
	const path = usePathname()
	const current = path.split("/")[3]

	return (
		<Container className="flex-col justify-start py-20 gap-10 w-1/3 text-custom-blue bg-custom-dark-grey">
			<h1 className="text-4xl font-bold">Settings</h1>
			<div className="flex text-2xl font-bold flex-col w-full">
				<Link className={`${current == "account" ? "bg-custom-grey border-l-2" : "bg-custom-dark-grey"} w-full py-5 px-3 border-custom-red`} href="/app/settings/account">
					Account
				</Link>
				<Link className={`${current == "info" ? "bg-custom-grey border-l-2" : "bg-custom-dark-grey"} w-full py-5 px-3 border-custom-red`} href="/app/settings/info">
					Info
				</Link>
			</div>
		</Container>
	)
}

export default SettingsSidebar
