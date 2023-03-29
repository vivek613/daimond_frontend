import React from "react";
import { useEffect } from "react";
import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getCookies } from "../Hooks/Auth/Cookies";

import { useLogin } from "../Hooks/Auth/useLogin";
import Home from "./Home/Home";
import { Login, CompanyTable, BuyData, sellData } from "./index";

const publicRouts = [{
    path: "/",
    component: Home,
},
{
    path: "login",
    component: Login,
},];
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
];

const Common = (route) => (
    <Suspense fallback={<div>Loading..</div>}>
        <route.component />
    </Suspense>
);

const Private = (route) => {
    const { auth } = useLogin();
    console.log(auth);

    if (!auth) return <Navigate to="/login" replace />;

    // Logic for Private routes

    const { component: Component } = route;

    //   const currentUserRole = user.role;

    //   if (!!permissions?.length && !permissions.includes(currentUserRole))
    //     return <Navigate to={"/unauthorized"} replace />;

    return (
        <Suspense
            fallback={
                <>Loading</>
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

    const { setAuth } = useLogin();

    useEffect(() => {
        if (getCookies("access_token")) {
            setAuth(true);
        }
    }, []);
    return (
        <Routes>
            {createNestedRoutes(privateRouts, Private)}
            {createNestedRoutes(publicRouts, Common)}


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
    )
}

export default Product