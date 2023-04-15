import React, { createContext, useContext } from "react";
import { Suspense } from "react";

import "./App.css"
import { Route, Navigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { useProduct } from "./context/useProduct";
import { AuthProvider, useLogin } from "./Hooks/Auth/useLogin";
import Home from "./Pages/Home/Home";
import { Login, CompanyTable, BuyData, sellData } from "./Pages/index";
import Product from "./Pages/Product";
import { LinearProgress } from "@mui/material";
import { Toaster } from "react-hot-toast";
export const productContext = createContext();

function App() {
  const { value } = useProduct();

  return (
    <>
      <Suspense fallback={<LinearProgress />}>
        <BrowserRouter>
          <productContext.Provider value={value}>
            <AuthProvider>
              <Toaster position="top-center" reverseOrder={false} />
              <Product />
            </AuthProvider>
          </productContext.Provider>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
