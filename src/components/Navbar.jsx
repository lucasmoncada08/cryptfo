import React, { useState, useEffect } from 'react'
import { Button, Menu, Typography, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { HomeOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons' 

import cryptoLogo from '../images/cryptfo-logo.png'

const NavBar = () => {
    const [activeMenu, setActiveMenu] = useState(true)
    const [screenSize, setScreenSize] = useState(null)

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth)

        window.addEventListener('resize', handleResize)
        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    })

    useEffect(() => {
        if (screenSize < 768)
            setActiveMenu(false)
        else
            setActiveMenu(true)
    }, [screenSize])

    return (
        <div className="nav-container">
            <div className='logo-container'>
                <Avatar src={cryptoLogo} size="large"/>
                <Typography.Title level={2} className='logo'>
                    <Link to='/'>Cryptfo</Link>
                </Typography.Title>
                <Button className='menu-control-container' onClick={() => setActiveMenu(true)}>
                    <MenuOutlined />
                </Button>
            </div>
            {activeMenu && 
                <Menu theme='dark'>
                    <Menu.Item icon={<HomeOutlined/>}>
                        <Link to='/'>Home</Link>
                    </Menu.Item>
                    <Menu.Item icon={<FundOutlined/>}>
                        <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
                    </Menu.Item>
                    {/* <Menu.Item icon={<MoneyCollectOutlined/>}>
                        <Link to='/exchanges'>Exchanges</Link>
                    </Menu.Item> */}
                    <Menu.Item icon={<BulbOutlined/>}>
                        <Link to='/news'>News</Link>
                    </Menu.Item>
                </Menu>
            }            
        </div>
    )
}

export default NavBar