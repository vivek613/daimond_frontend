import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home";
import { Login, Navbar, Table } from "./Pages/index";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Navbar />} />
          <Route path="/table" element={<Table />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
