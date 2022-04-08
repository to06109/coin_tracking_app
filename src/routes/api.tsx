const BASE_URL = `https://api.coinpaprika.com/v1`

export async function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json())
  //   const response = await fetch('https://api.coinpaprika.com/v1/coins')
  //   const json = await response.json()
  //   return json
}

export function fetchCoininfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json(),
  )
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json(),
  )
}

// 비트코인의 open, high, low, close, volume 등의 정보
export function fetchCoinHistory(coinId: string) {
  // 꼭 보내야 하는 필수 query parameter: 언제를 기준으로 받고싶은가?
  const endDate = Math.floor(Date.now() / 1000) //s로 표현
  const startDate = endDate - 60 * 60 * 24 * 7 * 2 // 이주일 전

  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`,
  ).then((response) => response.json())
}
