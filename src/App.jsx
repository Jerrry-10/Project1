import { useState } from "react";
import "./App.css";
import CurrentConversionRate from "./components/CurrentConversionRate";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Conversion from "./components/Conversion";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route exact path="/" element={<CurrentConversionRate />} />
          <Route
            exact
            path="/currentconversion"
            element={<CurrentConversionRate />}
          />
          <Route exact path="/conversion" element={<Conversion />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
