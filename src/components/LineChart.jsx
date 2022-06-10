import React from 'react'
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto';
import millify from 'millify'
import { Col, Row, Typography } from 'antd'

import Loader from './Loader';

const { Title } = Typography

const LineChart = ({ coinHistory, coinDetails, currentPrice, coinName, timePeriod }) => {

    // manual code to interact with weird api endpoint
    const coinPrice = []
    const coinTimestamp = []

    const now = new Date()
    const one_hour = 60*60*1000
    const one_day = one_hour*24

    if (coinHistory == null) return <Loader />

    const iterateThroughTimePeriod = (numPoints, timePerPoint) => {
        const priceLength = coinHistory.prices.length-1
        const iterateBy = Math.floor(priceLength / numPoints)
        for (let i=0; i<numPoints-1; i++) {
            coinPrice.push(coinHistory.prices[priceLength-iterateBy*i][1])
            coinTimestamp.push(new Date(now - timePerPoint*(numPoints-i)).toLocaleDateString())
        }
        coinPrice.push(currentPrice)
        coinTimestamp.push(now.toLocaleDateString())
    }

    switch(timePeriod) {
        case '24h':
            iterateThroughTimePeriod(24, one_hour)
            break
        case '7d':
            iterateThroughTimePeriod(14, one_hour*12)         
            break
        case '14d':
            iterateThroughTimePeriod(14, one_day)
            break
        case '30d':
            iterateThroughTimePeriod(30, one_day)
            break
        case '60d':
            iterateThroughTimePeriod(30, one_day*2)
            break
        case '1y':
            iterateThroughTimePeriod(36, one_day*10)
            break
        default:
            iterateThroughTimePeriod(14, one_hour*12)
            break
    }

    const data = {
        labels: coinTimestamp,
        datasets: [{
            label: 'Price in USD',
            data: coinPrice,
            fill: false,
            backgroundColor: '#0071bd', 
            borderColor: '#0071bd'
        }]
    }

    return (
    <>
        <Row className='chart-header'>
            <Title level={2} className='chart-title'>
                {coinName} Price Chart
            </Title>
            <Col className='price-container'>
                <Title level={5} className='price-change'>{((coinPrice.at(-1) - coinPrice[0])/coinPrice[0]*100).toFixed(4)}%</Title>
                <Title level={5} className='current_price'>Current {coinName} Price: $ {millify(currentPrice)}</Title>
            </Col>
        </Row>
        <Line data={data} options={{}}/>
    </>
    )
}

export default LineChart