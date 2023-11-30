import React from 'react'
import Container from '@/components/Container'
import Link from 'next/link'

const SettingsSidebar = () => {
    return (
        <Container className='flex-col justify-start py-20 gap-5 w-1/3'>
            <h1 className="text-5xl font-bold">Admin</h1>
            <div className="flex text-2xl font-bold flex-col ">
                <Link href="/app/settings/account">
                    Account
                </Link>
                <Link href="/app/settings/theme">
                    Theme
                </Link>
            </div>
        </Container>
    )
}

export default SettingsSidebar