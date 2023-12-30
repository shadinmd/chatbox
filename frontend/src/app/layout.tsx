import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import Provider from '@/components/Provider'

const inter = Inter({ subsets: ['latin']})

export const metadata: Metadata = {
	title: 'chat box',
	description: 'chat box is a secure end-to-end encrypted safe messasing app',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body style={{overflow: "hidden"}} className={inter.className}>
				<Provider >
					<Toaster richColors={true} />
					{children}
				</Provider>
			</body>
		</html>
	)
}
