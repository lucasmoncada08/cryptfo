import React from 'react'
import millify from 'millify'
import BigNumber from "bignumber.js";
import { Typography, Row, Col, Statistic } from 'antd'
import { Link } from 'react-router-dom'

import { Cryptocurrencies, News } from '../components'
import Loader from './Loader';

import { useGetCryptosQuery } from '../services/cryptoApi'

const { Title } = Typography

const Homepage = () => {
    const { data, isFetching } = useGetCryptosQuery()

    if (isFetching) return <Loader />
    // console.log(data.data)

    const homepageStats = data.data
    const total_market_cap_sum = homepageStats.total_market_cap.usd
    const total_market_cap_change_24h = homepageStats.market_cap_change_percentage_24h_usd

    return (
        <div>
            <>
                <Title level={2} className="heading">Global Crypto Stats</Title>
                <Row>
                    <Col span={12}>
                        <Statistic title='Total Cryptocurrencies' value={millify(homepageStats.active_cryptocurrencies)}/>
                    </Col>
                    <Col span={12}>
                        <Statistic title='Total Exchanges' value={homepageStats.markets}/>
                    </Col>
                    <Col span={12}>
                        <Statistic title='Total Market Cap' value={total_market_cap_sum.toExponential(3)}/>
                    </Col>
                    <Col span={12}>
                        <Statistic title='24h Market Cap Change' value={millify(total_market_cap_change_24h)+'%'}/>
                    </Col>
                </Row>

                <div className='home-heading-container'>
                    <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
                    <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show More</Link></Title>
                </div>
                <Cryptocurrencies simplified/>

                <div className='home-heading-container'>
                    <Title level={2} className='home-title'>Latest Crypto News</Title>
                    <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show More</Link></Title>
                </div>
                <News simplified/>

            </>
        </div>
    )
}

export default Homepage
