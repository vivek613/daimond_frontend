import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Navbar } from "../../index";
import { Table } from "../../../Components/index";
import { useCompanyDetails } from "../../../Hooks";
import { CompanyModel } from "./CompanyModel";
import { CompanyDetailsProvider } from "../../../Hooks/Application/useCompanyDetails";

export const CompanyTable = () => {
  const {
    handleGetAllCompany,
    allCompanyData,
    columns,
    open,
    setOpen,
  } = useCompanyDetails();

  useEffect(() => {
    handleGetAllCompany();
  }, []);
  console.log(open);
  return (
    <Box sx={{ height: "calc(100vh - 64px)", width: "100%" }}>
      <Navbar />
      <div className="content-wrapper">
        <div className="content-wrapper-button-div">
          <p className="content-wrapper-title">Company Data</p>
          <button
            className="df-primary-button"
            onClick={() => {
              setOpen(true);
            }}
          >
            Add Company
          </button>
        </div>
        <Table
          data={allCompanyData}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row._id}
        />
        <CompanyModel />
      </div>
    </Box>
  );
};

export const Wrapper = () => (
  <CompanyDetailsProvider>
    <CompanyTable />
  </CompanyDetailsProvider>
);

export default Wrapper;