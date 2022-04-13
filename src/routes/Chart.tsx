import { useQuery } from 'react-query'
import { fetchCoinHistory } from './api'
import ApexChart from 'react-apexcharts'
import { useRecoilValue } from 'recoil'
import { isDarkAtom } from '../atoms'

// typeScript에게 data 설명하기
interface IHistorical {
  time_open: string
  time_close: string
  open: number
  high: number
  low: number
  close: number // 종가를 보자
  volume: number
  market_cap: number
}

interface ChartProps {
  coinId: string
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom)
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    },
  )

  // candlestick 차트에 넣을 데이터배열
  const mappedChaetData = data?.map((price) => ({
    x: price.time_close,
    y: [
      price.open.toFixed(2),
      price.high.toFixed(2),
      price.low.toFixed(2),
      price.close.toFixed(2),
    ],
  }))

  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type="candlestick"
          series={([{ data: mappedChaetData }] as unknown) as number[]}
          options={{
            theme: {
              mode: isDark ? 'dark' : 'light',
            },
            chart: {
              // 차트 모양
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
            },
            xaxis: {
              type: 'datetime',
              axisTicks: { show: false },
              labels: { show: false },
            },
            yaxis: {
              show: false,
            },
          }}
        />
      )}
    </div>
  )
}

export default Chart
