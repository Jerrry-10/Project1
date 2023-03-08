import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const Conversions = () => {
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState(0);
  const [rates, setRates] = useState([]);
  const [btcValue, setBtcValue] = useState(0);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((response) => {
        setRates(response.data.bpi);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    const rate = rates[currency].rate_float;
    const value = e.target.value / rate;
    setBtcValue(value);
  };

  const handleSortToggle = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    const sortedRates = Object.entries(rates).sort((a, b) =>
      sortOrder === "asc"
        ? a[1].rate_float / rates[currency].rate_float -
          b[1].rate_float / rates[currency].rate_float
        : b[1].rate_float / rates[currency].rate_float -
          a[1].rate_float / rates[currency].rate_float
    );
    setRates(Object.fromEntries(sortedRates));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        marginTop: "75px",
      }}
    >
      <Typography variant="h5">Conversions</Typography>
      <Button variant="contained" onClick={handleSortToggle}>
        {sortOrder === "asc" ? "Sort Ascending" : "Sort Descending"}
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        {Object.entries(rates).map(([currency, rate]) => (
          <Typography key={currency}>
            {currency}: {rate.rate_float} = 1 BTC
          </Typography>
        ))}
      </Box>
      <FormControl variant="outlined">
        <InputLabel id="currency-select-label">Currency</InputLabel>
        <Select
          labelId="currency-select-label"
          id="currency-select"
          value={currency}
          onChange={handleCurrencyChange}
          label="Currency"
        >
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="EUR">EUR</MenuItem>
          <MenuItem value="GBP">GBP</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="outlined-basic"
        label="Amount"
        variant="outlined"
        value={amount}
        onChange={handleAmountChange}
      />
      <Typography variant="h6">
        {amount} {currency} = {btcValue} BTC
      </Typography>
    </Box>
  );
};

export default Conversions;
