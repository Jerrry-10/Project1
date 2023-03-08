import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <AppBar>
        <Toolbar>
          <CurrencyExchangeIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ mr: 5 }}>
            {" "}
            Crpyto Conversions!!{" "}
          </Typography>
          <Button color="inherit" variant="text" sx={{ mr: 5 }}>
            <Link
              to="/currentconversion"
              style={{ color: "white", textDecoration: "none" }}
            >
              Current Conversions Rates
            </Link>
          </Button>
          <Button color="inherit" variant="text" sx={{ mr: 5 }}>
            <Link
              to="/conversion"
              style={{ color: "white", textDecoration: "none" }}
            >
              Conversions
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
