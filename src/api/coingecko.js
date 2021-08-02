import Axios from 'axios'
import moment from 'moment'

const axios = Axios.create()

const DATE_FORMAT = "YYYY-MM-DD"

export const marketChart = async ({ dateFrom, dateTo }, vs_currency = 'usd', coin = 'bitcoin') => {
  const BASE_URL = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart/range`

  // validate dates
  const mDateFrom = moment(dateFrom, DATE_FORMAT)
  const mDateTo = moment(dateTo, DATE_FORMAT)
  if (!mDateFrom.isValid()) throw new Error('date from is not valid')
  if (!mDateTo.isValid()) throw new Error('date to is not valid')
  if (mDateFrom.isAfter(mDateTo)) throw new Error('date range is not valid')

  // convert tipes to unix
  const from = mDateFrom.unix()
  const to = mDateTo.unix()

  // send request
  const res = await axios.get(BASE_URL, {
    params: { from, to, vs_currency }
  })
  if (!res.status === 200) throw new Error('bad request')
  return res.data?.prices ?? []
}
