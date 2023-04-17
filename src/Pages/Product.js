/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useLogin } from "../Hooks/Auth/useLogin";
import Home from "./Home/Home";
import { Login, CompanyTable, BuyData, sellData } from "./index";
import AllData from "./Table/AllData/AllData";
import { CircularProgress, LinearProgress } from "@mui/material";

const publicRouts = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "login",
    component: Login,
  },
];
const privateRouts = [
  {
    path: "company",
    component: CompanyTable,
  },
  {
    path: "buy",
    component: BuyData,
  },
  {
    path: "sell",
    component: sellData,
  },
  {
    path: "alldata",
    component: AllData,
  },
];

const Common = (route) => (
  <Suspense
    fallback={
      <LinearProgress
        sx={{
          backgroundColor: "white",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "gray",
          },
        }}
      />
    }
  >
    <route.component />
  </Suspense>
);

const Private = (route) => {
  const { auth } = useLogin();

  if (!auth) return <Navigate to="/login" replace />;

  // Logic for Private routes

  const { component: Component } = route;

  //   const currentUserRole = user.role;

  //   if (!!permissions?.length && !permissions.includes(currentUserRole))
  //     return <Navigate to={"/unauthorized"} replace />;

  return (
    <Suspense
      fallback={
        <LinearProgress
          sx={{
            backgroundColor: "white",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "gray",
            },
          }}
        />
      }
    >
      <Component />
    </Suspense>
  );
};

const createNestedRoutes = (routes, RouteType) => {
  return routes.map((route, i) => {
    return (
      <Route
        key={i}
        index={route.index}
        path={route.path}
        element={<RouteType component={route.component} />}
      />
    );
  });
};
const Product = () => {
  const { setAuth, loading, setLoading } = useLogin();

  useEffect(() => {
    setLoading(true)
    if (sessionStorage.getItem("access_token")) {
      setAuth(true)
      setLoading(false)
        ;
    } else {
      setLoading(false)

    }
  }, []);

  if (loading)
    return (
      <>
        <div
          id="BrowserLoader"
          style={{
               width: "100%",
            height: "100%",
            position: "fixed",
            zIndex: 10000000,
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
            backgroundColor: "#fff",
          }}
        >
          <CircularProgress />
        </div>
      </>
    );


  return (
    <Routes>
      {createNestedRoutes(privateRouts, Private)}
      {createNestedRoutes(publicRouts, Common)}
    </Routes>
  );
};

export default Product;
