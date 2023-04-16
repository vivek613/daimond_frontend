/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  BillDataProvider,
  useBillData,
} from "../../../Hooks/Application/useBillData";
import { Navbar } from "../../Navbar/Navbar";
import { BuyDataModel } from "./BuyDataModel";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BuyEntryData } from "./BuyEntryData";
import { LinearProgress, TablePagination } from "@mui/material";
import { useContext } from "react";
import { productContext } from "../../../App";

const BillData = () => {
  const { search } = useContext(productContext);
  const {
    handleGetAllBill,
    billData,
    open,
    setOpen,
    buyLoading,
    setExpiryDate,
    setStartDate,
    reset,
    getValues,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    filterData,
  } = useBillData();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    handleGetAllBill(search, page, rowsPerPage);
  }, [search, page, rowsPerPage]);

  return (
    <>
      <Box sx={{ height: "calc(100vh - 64px)", width: "100%" }}>
        <Navbar />
        <div className="content-wrapper">
          <div className="content-wrapper-button-div">
            <p className="content-wrapper-title">Buy Data</p>
            {/* <div className={style["filter-date-picker"]}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="filter date"
                    // value={startDate}
                    format="DD-MM-YYYY"
                    value={filterDate}
                    onChange={(newValue) => {
                      setFilterDate(newValue);
                      setFilterData(
                        billData?.data?.filter((row) => {
                          return (
                            row?.end_date?.substring(0, 10) ===
                            newValue.format("YYYY-MM-DD")
                          );
                        })
                      );
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <Button
                variant="outlined"
                onClick={() => {
                  setFilterData(billData?.data);
                  setFilterDate(null);
                }}
              >
                No filter
              </Button>
            </div> */}
            <button
              className="df-primary-button"
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
            </button>
          </div>
          {buyLoading ? (
            <LinearProgress
              sx={{
                backgroundColor: "white",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "gray",
                },
              }}
            />
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
                      <TableCell align="right">Total</TableCell>
                      <TableCell align="right">Due Days</TableCell>
                      <TableCell align="right">Start Date</TableCell>
                      <TableCell align="right">End Date</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filterData?.map((row) => (
                      <BuyEntryData key={row.name} row={row} />
                    ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100]}
                  component="div"
                  count={billData?.rowsCount || 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
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
