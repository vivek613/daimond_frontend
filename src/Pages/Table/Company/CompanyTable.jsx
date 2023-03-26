import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Navbar } from "../../index";
import { Table } from "../../../Components/index";
import { useCompanyDetails } from "../../../Hooks";
import { CompanyModel } from "./CompanyModel";

export const CompanyTable = () => {
  const { handleGetAllCompany, allCompanyData, columns } = useCompanyDetails();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    handleGetAllCompany();
  }, []);
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
        <CompanyModel open={open} setOpen={setOpen} />
      </div>
    </Box>
  );
};
