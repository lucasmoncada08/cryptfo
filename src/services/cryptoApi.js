import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_RA_CRYPTO_API_KEY
}

const cryptoApiParams = {
    vs_currency: 'usd', page: '1', per_page: '10', order: 'market_cap_desc'
}

const coinHistoryApiParams = {
    vs_currency: 'usd',
    days: null,
    id: null
}
// ['24h', '7d', '14d', '30d', '60d', '200d', '1y']
const timePeriodToDays = {
    '24h': '1',
    '7d': '7',
    '14d': '14',
    '30d': '30',
    '60d': '60',
    '1y': '365'
}

const baseUrl = 'https://coingecko.p.rapidapi.com'

const createRequest = (endpoint, apiParams=null) => ({url: endpoint, headers: cryptoApiHeaders, params: apiParams})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: () => {
                console.log(process.env.REACT_APP_RA_CRYPTO_API_KEY)
                return createRequest('/global')
            }
        }),
        getCoins: builder.query({
            query: (count) => {
                cryptoApiParams['per_page'] = count
                return createRequest('coins/markets', cryptoApiParams)
            }
        }),
        getCoinDetails: builder.query({
            query: (coinId) => createRequest(`/coins/${coinId}`)
        }),
        getCoinHistory: builder.query({
            query: ({coinId, timePeriod}) => {
                coinHistoryApiParams['id'] = coinId
                coinHistoryApiParams['days'] = timePeriodToDays[timePeriod]
                return createRequest(`/coins/${coinId}/market_chart`, coinHistoryApiParams) 
            }
        }),
    })
})

export const {
    useGetCryptosQuery,
    useGetCoinsQuery,
    useGetCoinDetailsQuery,
    useGetCoinHistoryQuery,
} = cryptoApi
