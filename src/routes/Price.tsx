import { fetchCoinTickers } from './api'
import { useQuery } from 'react-query'
import ApexChart from 'react-apexcharts'
import styled from 'styled-components'

interface IPriceData {
  id: string
  name: string
  symbol: string
  rank: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  beta_value: number
  first_data_at: string
  last_updated: string
  quotes: {
    USD: {
      ath_date: string
      ath_price: number
      market_cap: number
      market_cap_change_24h: number
      percent_change_1h: number
      percent_change_1y: number
      percent_change_6h: number
      percent_change_7d: number
      percent_change_12h: number
      percent_change_15m: number
      percent_change_24h: number
      percent_change_30d: number
      percent_change_30m: number
      percent_from_price_ath: number
      price: number
      volume_24h: number
      volume_24h_change_24h: number
    }
  }
}

interface PriceProps {
  coinId: string
}

const H1 = styled.div`
  color: ${(props) => props.theme.accentColor};
  font-weight: bold;
`

function Price({ coinId }: PriceProps) {
  const { isLoading, data: priceData } = useQuery<IPriceData>(
    ['price', coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 10000,
    },
  )

  const mappedPriceData = [
    priceData?.quotes.USD.percent_change_15m,
    priceData?.quotes.USD.percent_change_30m,
    priceData?.quotes.USD.percent_change_1h,
    priceData?.quotes.USD.percent_change_6h,
    priceData?.quotes.USD.percent_change_12h,
    priceData?.quotes.USD.percent_change_24h,
    priceData?.quotes.USD.percent_change_30d,
    priceData?.quotes.USD.percent_change_1y,
  ]

  return (
    <div style={{ backgroundColor: 'white' }}>
      <H1>percent_change</H1>
      {isLoading ? (
        'Loading price...'
      ) : (
        <ApexChart
          type="bar"
          series={([{ data: mappedPriceData }] as unknown) as number[]}
          options={{
            chart: {
              width: 500,
              height: 500,
            },
            plotOptions: {
              bar: {
                borderRadius: 4,
                horizontal: true,
              },
            },
            xaxis: {
              labels: { show: false },
              categories: ['15m', '30m', '1h', '6h', '12h', '24h', '30d', '1y'],
            },
            fill: {
              // 그라데이션
              type: 'gradient',
              gradient: { gradientToColors: ['#0be881'], stops: [0, 100] },
            },
          }}
        />
      )}
    </div>
  )
}

export default Price
