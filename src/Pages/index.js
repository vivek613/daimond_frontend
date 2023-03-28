import { lazy } from "react";
import { Login } from "./Login/Login";

const Navbar = lazy(async () =>
    await import(/* webpackChunkName: "Navbar" */ "./Navbar/Navbar")
);
const CompanyTable = lazy(async () =>
    await import(/* webpackChunkName: "CompanyTable" */ "./Table/Company/CompanyTable")
);
const BillData = lazy(async () =>
    await import(/* webpackChunkName: "BillData" */ "./Table/BillData/BillData")
);


export { Login, Navbar, BillData, CompanyTable };