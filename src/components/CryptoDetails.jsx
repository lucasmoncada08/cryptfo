import React, {useState} from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import moment from 'moment'
import { Col, Row, Typography, Select } from 'antd'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, TrophyOutlined, CodeOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCoinDetailsQuery, useGetCoinHistoryQuery } from '../services/cryptoApi'
import LineChart from './LineChart'
import Loader from './Loader'

const { Title, Text } = Typography
const { Option } = Select

const CryptoDetails = () => {
  const { coinId } = useParams()
  const [timePeriod, setTimePeriod] = useState('7d')

  const { data: coinDetails, isFetching } = useGetCoinDetailsQuery(coinId)
  const { data: coinHistory, isFetchingCHistory } = useGetCoinHistoryQuery({coinId, timePeriod})
  // console.log(coinDetails)
  // console.log(coinHistory)

  if (isFetching) return <Loader />
  if (isFetchingCHistory) return <Loader />

  const time = ['24h', '7d', '14d', '30d', '60d', '1y']

  // console.log(coinDetails.market_data.ath.usd)

  const stats = [
    { title: 'Price to USD', value: `$ ${coinDetails.market_data.current_price.usd && millify(coinDetails.market_data.current_price.usd)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: coinDetails.market_cap_rank, icon: <NumberOutlined /> },
    { title: '24h Price Change', value: `$ ${coinDetails.market_data.price_change_24h && millify(coinDetails.market_data.price_change_24h)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${coinDetails.market_data.market_cap.usd && millify(coinDetails.market_data.market_cap.usd)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high', value: `$ ${millify(coinDetails.market_data.ath.usd)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Circulating Supply', value: `$ ${millify(coinDetails.market_data.circulating_supply)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Liquidity Score', value: coinDetails.liquidity_score, icon: <FundOutlined /> },
    { title: 'Developer Score', value: coinDetails.developer_score, icon: <CodeOutlined />},
    { title: 'Genesis Date', value: `${moment(coinDetails.genesis_date).format('MMM Do, YYYY')}`, icon: <MoneyCollectOutlined /> },
    { title: 'All-time-high Date', value: `${moment(coinDetails.market_data.ath_date.usd).format('MMM Do, YYYY')}`, icon: <TrophyOutlined /> },
  ];

  return (
    <Col className='coin-detail-container'>
      <Col>
        <Title level={2} className='coin-name'>
          {coinDetails.name} ({coinDetails.symbol}) Price
        </Title>
        <p>
          {coinDetails.name} live price in US dollars
          View value statistics, market cap, and more.
        </p>
      </Col>
      <Select 
        defaultValue='7d' 
        className='select-timeperiod' 
        placeholder='Select Time Period'
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => <Option key={date}>{date}</Option>)}
      </Select>
      <LineChart 
        coinHistory={coinHistory}
        coinDetails={coinDetails}
        currentPrice={coinDetails.market_data.current_price.usd} 
        coinName={coinDetails.name}
        timePeriod={timePeriod}
      />

      <Col className='stats-container'>

        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              {coinDetails.name} Value Statistics
            </Title>
            <p>
              An overview showing the stats of {coinDetails.name}
            </p>
          </Col>
          {stats.map(({icon, title, value}) => (
            <Col className='coin-stats'>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
                <Text className='stats'>{value}</Text>
              </Col>
            </Col>
          ))}
        </Col>

        <Col className='other-stats-info'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              {coinDetails.name} Additional Information
            </Title>
            <p>
              Extra details regarding {coinDetails.name}
            </p>
          </Col>
          {genericStats.map(({icon, title, value}) => (
            <Col className='coin-stats'>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
                <Text className='stats'>{value}</Text>
              </Col>
            </Col>
          ))}
        </Col>

      </Col>

      <Col className='coin-desc-lin'>
        <Row className='coin-desc'>
          <Title level={3} className='coin-details-heading'>
            What is {coinDetails.name}?
            {/* <br/> */}
          </Title>
          <p className='coin-details-desc'>{HTMLReactParser(coinDetails.description.en)}</p>
        </Row>    
      </Col>

    </Col>
  )
}

export default CryptoDetails