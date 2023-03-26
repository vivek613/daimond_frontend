import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home";
import { Login, CompanyTable, BillData } from "./Pages/index";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/company" element={<CompanyTable />} />
          <Route path="/bill" element={<BillData />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
