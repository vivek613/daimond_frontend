/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { Navbar } from "../../Navbar/Navbar";
import { Table } from "../../../Components";
import { useCompanyDetails } from "../../../Hooks";
import { CompanyModel } from "./CompanyModel";
import { CompanyDetailsProvider } from "../../../Hooks/Application/useCompanyDetails";
import ReportModel from "./ReportModel";
import { useContext } from "react";
import { productContext } from "../../../App";

const CompanyTable = () => {
  const { search } = useContext(productContext);
  const {
    handleGetAllCompany,
    allCompanyData,
    columns,
    setOpen,
    reset,
    getValues,
    companyLoading,
  } = useCompanyDetails();

  useEffect(() => {
    handleGetAllCompany(search);
  }, [search]);

  return (
    <Box sx={{ height: "calc(100vh - 64px)", width: "100%" }}>
      <Navbar />

      <div className="content-wrapper">
        <div className="content-wrapper-button-div">
          <p className="content-wrapper-title">Company Data</p>
          <button
            className="df-primary-button"
            onClick={() => {
              reset({
                ...getValues(),
                id: "",
                company_name: "",
                company_description: "",
              });
              setOpen(true);
            }}
          >
            Add Company
          </button>
        </div>
        <Table
          data={allCompanyData}
          columns={columns}
          pageSize={10}
          getRowId={(row) => row._id}
          loading={companyLoading}
        />
        <CompanyModel />
        <ReportModel />
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
