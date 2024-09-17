import React, { useContext, useEffect, useState } from "react";
import "./Home.scss";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);

  // usestate to store data in the search input form
  const [input, setInput] = useState("");

  // handle the information thats inputted in the search bar
  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = async (event) => {
    // prevent page from refreshing when submitting
    event.preventDefault();
    // filltered data will be stored in coins
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    // display the results in set diplay function
    setDisplayCoin(coins);
  };

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
        <form onSubmit={searchHandler}>
          {/* once information is typed itll be stored in input and handler will be called */}
          <input
            onChange={inputHandler}
            list='coinList'
            value={input}
            type="text"
            placeholder="Search for Crypto..."
            required
          />
          {/* will generate result ideas to chose form when typing */}
          <datalist id="coinList">
            {allCoin.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>
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
            <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
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
            </Link>
          ))
        }
      </div>
    </div>
  );
};

export default Home;
