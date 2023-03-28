import { lazy } from "react";
import { Login } from "./Login/Login";

const Navbar = lazy(() =>
    import(/* webpackChunkName: "Navbar" */ "./Navbar/Navbar")
);
const CompanyTable = lazy(() =>
    import(/* webpackChunkName: "CompanyTable" */ "./Table/Company/CompanyTable")
);
const BillData = lazy(() =>
    import(/* webpackChunkName: "BillData" */ "./Table/BillData/BillData")
);


export { Login, Navbar, BillData, CompanyTable };