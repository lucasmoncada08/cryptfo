import React, { useEffect, useState } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'

import Loader from './Loader'
import { useGetCoinsQuery } from '../services/cryptoApi'

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10: 50
  const { data: cryptoList, isFetching } = useGetCoinsQuery(count)
  const [cryptos, setCryptos] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setCryptos(cryptoList)
    const filteredData = cryptoList?.filter((coin) => coin.id.toLowerCase().includes(searchTerm.toLowerCase()))
    setCryptos(filteredData)

  }, [cryptoList, searchTerm])

  if (isFetching) return <Loader/>

  return (
    <>
      {!simplified && <div className='search-crypto'>
        <Input placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)}/>
      </div>}
      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos?.map((currency, index) => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card 
                title={`${index+1}. ${currency.id}`}
                extra={<img className='crypto-image' src={currency.image} alt={'logo'}/>}
                hoverable
              >
                <p>Price: {millify(currency.current_price)}</p>
                <p>Market Cap: {millify(currency.market_cap)}</p>
                <p>Daily Change: {millify(currency.price_change_percentage_24h)}%</p>

              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies