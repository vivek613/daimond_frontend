import React, { useEffect, useState } from "react";
// import { Table } from "../../../Components/index";
import {
  BillDataProvider,
  useBillData,
} from "../../../Hooks/Application/useBillData";
import { Navbar } from "../../Navbar/Navbar";
import { BuyDataModel } from "./BuyDataModel";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { BuyEntryData } from "./BuyEntryData";

const BillData = () => {
  const {
    handleGetAllBill,
    billData,
    setPaginationModel,
    paginationModel,
    open,
    setOpen,
    columns,
    buyLoading,
    setExpiryDate,
    setStartDate,
    reset,
    getValues,
    handleGetAllEntryById,
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
            <Button
              variant="contained"
              onClick={() => {
                setStartDate(null);
                setExpiryDate(null);
                reset({
                  ...getValues(),
                  company_name: "",
                  description: "",
                  currency_type: "",
                  price: "",
                  remaining: "",
                  due_days: "",
                  give: "",
                  total_payment: 0,
                  start_date: "",
                  end_date: "",
                  add_give: 0,
                  dollar_price: 0,
                  buy_id: "",
                });
                setOpen(true);
              }}
            >
              Add Buy Bill
            </Button>
          </div>
          {buyLoading ? (
            <p>loading</p>
          ) : (
            <>
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Company</TableCell>
                      <TableCell align="right">Desc...</TableCell>
                      <TableCell align="right">Bill No</TableCell>
                      <TableCell align="right">currency Type</TableCell>
                      <TableCell align="right">Total</TableCell>
                      <TableCell align="right">Due Days</TableCell>
                      <TableCell align="right">Start Date</TableCell>
                      <TableCell align="right">End Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {billData?.data?.map((row) => (
                      <BuyEntryData key={row.name} row={row} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}

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
