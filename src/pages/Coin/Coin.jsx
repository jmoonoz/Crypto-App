import React, { useContext, useEffect, useState } from "react";
import "./Coin.scss";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";

const Coin = () => {
  // get the id from the URL
  const { coinId } = useParams();

  // useState to store the data
  const [coinData, setCoinData] = useState();
  const [dataHistory, setDataHistory] = useState();
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((response) => response.json())
      .then((response) => setCoinData(response))
      .catch((err) => console.error(err));
  };

  const fetchDataHistory = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-gHhB1sgPNobwZnZy7QtQG2wE",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10`,
      options
    )
      .then((response) => response.json())
      .then((response) => setDataHistory(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoinData();
    // whenever the currecny changes it'll update here
  }, [currency]);

  // if coin data and data history is available itll return the info
  if (coinData && dataHistory) {
    return (
      <div className="coin">
        <div className="coin-name">
          <img src={coinData.image.large} alt="" />
          <p>
            <b>
              {coinData.name} ({coinData.symbol.toUpperCase()})
            </b>
          </p>
        </div>
      </div>
    );
  } else {
    return (
      // will show loader if there is no coin or its loading
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
};

export default Coin;
