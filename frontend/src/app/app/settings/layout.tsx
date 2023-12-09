import Container from '@/components/Container'
import SettingsSidebar from '@/components/settings/Sidebar'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Container className=''>
            <SettingsSidebar />
            {children}
        </Container>
    )
}

export default Layout