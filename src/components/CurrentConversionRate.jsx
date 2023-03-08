import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";
import EuroIcon from "@mui/icons-material/Euro";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";

function CurrentConversionRate() {
  const [currentPrice, setCurrentPrice] = useState([]);
  const [lastRefreshTime, setLastRefreshTime] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getPrice = async () => {
    try {
      setIsRefreshing(true);
      const response = await axios.get(
        `https://api.coindesk.com/v1/bpi/currentprice.json`
      );
      setCurrentPrice(response.data);
      setLastRefreshTime(Date.now());
    } catch (error) {
      console.log(error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    getPrice();
  }, []);

  const handleRefresh = () => {
    const currentTime = Date.now();
    if (lastRefreshTime && currentTime - lastRefreshTime < 5 * 60 * 1000) {
      alert("Please wait at least 5 minutes before refreshing again.");
    } else {
      getPrice();
    }
  };
  return (
    <div style={{ display: "flex", marginTop: "70px" }}>
      <div style={{ flex: 1 }}>
        <p>Disclaimer: {currentPrice.disclaimer} </p>
        <div style={{ display: "flex", alignItems: "center" }}>
          <AttachMoneyIcon />
          <p style={{ marginLeft: "5px" }}>
            USD: {currentPrice.bpi?.USD.rate_float} = 1 Bitcoin
          </p>{" "}
          <CurrencyBitcoinIcon />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <CurrencyPoundIcon />
          <p style={{ marginLeft: "5px" }}>
            GBP: {currentPrice.bpi?.GBP.rate_float} = 1 Bitcoin
          </p>{" "}
          <CurrencyBitcoinIcon />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <EuroIcon />
          <p style={{ marginLeft: "5px" }}>
            EUR: {currentPrice.bpi?.EUR.rate_float} = 1 Bitcoin
          </p>{" "}
          <CurrencyBitcoinIcon />
        </div>
        <p>
          {" "}
          Time updated: {new Date(currentPrice.time?.updated).toLocaleString()}
        </p>
        <button onClick={handleRefresh} disabled={isRefreshing}>
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>
      <div style={{ flex: 1, marginTop: "70px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <AttachMoneyIcon />
          <p style={{ marginLeft: "5px" }}>
            1 USD = {1 / currentPrice.bpi?.USD.rate_float} Bitcoin
          </p>{" "}
          <CurrencyBitcoinIcon />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <CurrencyPoundIcon />
          <p style={{ marginLeft: "5px" }}>
            1 GBP = {1 / currentPrice.bpi?.GBP.rate_float} Bitcoin
          </p>{" "}
          <CurrencyBitcoinIcon />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <EuroIcon />
          <p style={{ marginLeft: "5px" }}>
            1 EUR = {1 / currentPrice.bpi?.EUR.rate_float} Bitcoin
          </p>{" "}
          <CurrencyBitcoinIcon />
        </div>
      </div>
    </div>
  );
}

export default CurrentConversionRate;
