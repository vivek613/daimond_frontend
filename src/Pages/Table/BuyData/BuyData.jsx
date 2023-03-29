import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { Table } from "../../../Components/index";
import {
  BillDataProvider,
  useBillData,
} from "../../../Hooks/Application/useBillData";
import { Navbar } from "../../Navbar/Navbar";
import { BuyDataModel } from "./BuyDataModel";

const BillData = () => {
  const {
    handleGetAllBill,
    billData,
    setPaginationModel,
    paginationModel,
    open,
    setOpen,
    columns,
  } = useBillData();
  const handleChange = (e) => {
    console.log(e);
  };

  useEffect(() => {
    handleGetAllBill();
  }, []);

  return (
    <>
      <Box sx={{ height: "calc(100vh - 64px)", width: "100%" }}>
        <Navbar />
        <div className="content-wrapper">
          <div className="content-wrapper-button-div">
            <p className="content-wrapper-title">Buy Data</p>
            <button
              className="df-primary-button"
              onClick={() => {
                setOpen(true);
              }}
            >
              Add Buy
            </button>
          </div>
          <Table
            style={{
              height: "70%",
            }}
            data={(billData && billData.data) || []}
            rowCount={billData.rowsCount || 0}
            columns={columns}
            pageSize={5}
            getRowId={(row) => row._id}
            paginationModel={paginationModel}
            onPaginationModelChange={handleChange}
          />
          <BuyDataModel open={open} setOpen={setOpen} />
        </div>
      </Box>
    </>
  );
};

export const Wrapper = () => (
  <BillDataProvider>
    <BillData />
  </BillDataProvider>
);

export default Wrapper;
