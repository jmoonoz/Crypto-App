import { createContext, useEffect, useState } from "react";

// create context hook

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  // get data will arrive from api in the form of an array
  const [allCoin, setAllCoin] = useState([]);
  //  setting default currency to usd
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const fetchAllCoin = async () => {
    const apiKey = import.meta.env.VITE_CRYPTO_API_KEY;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": apiKey,
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
      options
    )
      .then((response) => response.json())
      //   goes to the useState to update the crypto
      .then((response) => setAllCoin(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAllCoin();
  }, [currency]);
  const contextValue = {
    allCoin,
    currency,
    setCurrency,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
