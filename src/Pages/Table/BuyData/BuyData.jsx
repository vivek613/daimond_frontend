import React, { useEffect, useState } from "react";
import { getCookies } from "../../../Hooks/Auth/Cookies";
import {
  BillDataProvider,
  useBillData,
} from "../../../Hooks/Application/useBillData";
import { Navbar } from "../../Navbar/Navbar";
import { BuyDataModel } from "./BuyDataModel";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BuyEntryData } from "./BuyEntryData";
import { LinearProgress } from "@mui/material";
import { useContext } from "react";
import { productContext } from "../../../App";

const BillData = () => {
  const { search } = useContext(productContext);
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
  const tokenStr = getCookies("access_token");

  useEffect(() => {
    handleGetAllBill(search);
  }, [search]);

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
            <LinearProgress />
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
                      {/* <TableCell align="right">currency Type</TableCell> */}
                      <TableCell align="right">Total</TableCell>
                      <TableCell align="right">Due Days</TableCell>
                      <TableCell align="right">Start Date</TableCell>
                      <TableCell align="right">End Date</TableCell>
                      <TableCell align="right">Action</TableCell>
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
