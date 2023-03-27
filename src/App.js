import React, { createContext, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { useProduct } from "./context/useProduct";
import Home from "./Pages/Home/Home";
import { Login, CompanyTable, BillData } from "./Pages/index";
export const productContext = createContext();

function App() {
  const { value } = useProduct();
  console.log(value);
  return (
    <>
      <BrowserRouter>
        <productContext.Provider value={value}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/company" element={<CompanyTable />} />
            <Route path="/bill" element={<BillData />} />
          </Routes>
        </productContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
