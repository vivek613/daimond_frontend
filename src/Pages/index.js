import { lazy } from "react";
import { Login } from "./Login/Login";

const Navbar = lazy(
  async () => await import(/* webpackChunkName: "Navbar" */ "./Navbar/Navbar")
);
const CompanyTable = lazy(
  async () =>
    await import(
      /* webpackChunkName: "CompanyTable" */ "./Table/Company/CompanyTable"
    )
);
const BuyData = lazy(
  async () =>
    await import(/* webpackChunkName: "BillData" */ "./Table/BuyData/BuyData")
);
const sellData = lazy(
  async () =>
    await import(/* webpackChunkName: "sellData" */ "./Table/SellData/SellData")
);

export { Login, Navbar, BuyData, CompanyTable, sellData };
