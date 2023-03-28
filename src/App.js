import React, { createContext, useContext } from "react";
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { useProduct } from "./context/useProduct";
import Home from "./Pages/Home/Home";
import { Login, CompanyTable, BuyData, sellData } from "./Pages/index";
export const productContext = createContext();

const paths = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "login",
    component: Login,
  },
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
];

const Common = (route) => (
  <Suspense fallback={<div>Loading..</div>}>
    <route.component />
  </Suspense>
);

const createNestedRoutes = (routes, RouteType) => {
  return paths.map((route, i) => {
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

function App() {
  const { value } = useProduct();
  console.log(value);
  return (
    <>
      <Suspense fallback={<div>Loading..</div>}>
        <BrowserRouter>
          <productContext.Provider value={value}>
            <Routes>
              {createNestedRoutes(paths, Common)}
              {/* <Route path="/" element={<Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>} />
            <Route path="/login" element={<Suspense fallback={<div>Loading...</div>}>
              <Login />
            </Suspense>} />
            <Route path="/company" element={<Suspense fallback={<div>Loading...</div>}>
              <CompanyTable />
            </Suspense>} />
            <Route path="/bill" element={<Suspense fallback={<div>Loading...</div>}>
              <BillData />
            </Suspense>} /> */}

              {/* <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/company" element={<CompanyTable />} />
              <Route path="/bill" element={<BillData />} /> */}
            </Routes>
          </productContext.Provider>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
