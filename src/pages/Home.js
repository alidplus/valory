import React, { useEffect, useState } from "react";
import FilterForm from "../components/FilterForm";
import HeroPrice from "../components/HeroPrice";
import { useLocation, useHistory } from "react-router-dom";
import { marketChart } from '../api/coingecko'

function useQuery() {
  const searchParams = new URLSearchParams(useLocation().search);
  const query = {}
  for (const param of searchParams.keys()) {
    query[param] = searchParams.get(param)
  }
  return query
}

const Home = function Home() {
  const [isLoading, setLoading] = useState(null)
  const [data, setData] = useState([])
  const history = useHistory()
  const query = useQuery();
  const handleSubmit = (newQuery) => {
    const search = new URLSearchParams(newQuery).toString()
    history.push({ search })
  }
  useEffect(() => {
    reloadData()
  }, [query.dateFrom, query.dateTo])

  const reloadData = async () => {
    if (isLoading) return
    setLoading(true)
    try {
      const data = await marketChart(query)
      setData(data)
    } catch (e) {
      console.log('err on reloadData', e)
      setData([])
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="container bounce-top">
      <h1 className="page-title">Bitcoin’s average price</h1>
      <HeroPrice data={data} isLoading={isLoading}/>
      <FilterForm defaultValues={query} onSubmit={handleSubmit} isLoading={isLoading}/>
    </div>
  );
}

export default Home;
