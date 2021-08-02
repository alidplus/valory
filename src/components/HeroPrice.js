import React, { useState, useEffect } from "react";
import reduce from '../lib/reducer'
import CountUp from 'react-countup';
import classnames from 'classnames'

// const formatter = new Intl.NumberFormat('en-US', {
//   style: 'currency',
//   currency: 'USD',
// });

const HeroPrice = function HeroPrice({ data, isLoading }) {
  const [countUp, setCountUp] = useState(false)
  const [averagePrice, setAveragePrice] = useState(0)
  const [previousAveragePrice, setPreviousAveragePrice] = useState(0)

  useEffect(() => {
    setPreviousAveragePrice(averagePrice)
    const avPrice = reduce(data, (sum, record) => sum + record[1], 0) / Math.max(data.length, 1)
    setAveragePrice(avPrice)
  }, [data])

  return (
    <React.Fragment>
      <div className={classnames("hero-price", { 'text-counting': countUp })}>
        <CountUp
          start={previousAveragePrice}
          end={averagePrice}
          duration={1.5}
          separator=","
          decimals={2}
          decimal="."
          prefix="$ "
          suffix=""
          onEnd={() => setCountUp(false)}
          onStart={() => setCountUp(true)}
        />
      </div>
    </React.Fragment>
  );
}

export default HeroPrice;
