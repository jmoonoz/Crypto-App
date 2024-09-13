import React, { useContext, useEffect, useState } from "react";
import "./Home.scss";
import { CoinContext } from "../../context/CoinContext";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);

  // creates copy of the data
  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br />
          Crypto Market place
        </h1>
        <p>
          Worlds Largest Cryptocurrency market mining place. Sign up to learn
          more
        </p>
        <form>
          <input type="text" placeholder="Search for Crypto..." />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coin</p>
          <p>Price</p>
          <p className="change">24Hr Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {
          // limit to 10 data sets
          displayCoin.slice(0, 10).map((item, index) => (
            <div className="table-layout" key={index}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt="" />
                <p>{item.name + " - " + item.symbol}</p>
              </div>
              <p>
                {currency.symbol} {item.current_price.toLocaleString()}
              </p>
              {/* depending on what the number return, will determine the color */}
              <p className={item.price_change_24h > 0 ? "green" : "red"}>
                {Math.floor(item.price_change_24h * 100) / 100}
              </p>
              <p className="market-cap">
                {currency.symbol} {item.market_cap.toLocaleString()}
              </p>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Home;
