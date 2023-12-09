'use client';
import React from 'react'
import Container from '@/components/Container'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SettingsSidebar = () => {
	const path = usePathname()
	const current = path.split("/")[3]

	return (
		<Container className="flex-col justify-start py-20 gap-10 w-1/3">
			<h1 className="text-4xl font-bold">Settings</h1>
			<div className="flex text-2xl font-bold flex-col gap-5">
				<Link className={current != "account" ? "opacity-50" : ""} href="/app/settings/account">
					Account
				</Link>
				<Link className={current != "theme" ? "opacity-50" : ""} href="/app/settings/theme">
					Theme
				</Link>
				<Link className={current != "info" ? "opacity-50" : ""} href="/app/settings/info">
					Info
				</Link>
			</div>
		</Container>
	)
}

export default SettingsSidebar
