import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
// import { Table } from "../../../Components/index";
import {
  SellDataProvider,
  useSellData,
} from "../../../Hooks/Application/useSellData";
import { Navbar } from "../../Navbar/Navbar";
import { SellDataModel } from "./SellDataModel";
import Button from "@mui/material/Button";
import style from "./SellData.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Paper from "@mui/material/Paper";

import { SellEntryData } from "./SellEntryData";
import { LinearProgress, TablePagination } from "@mui/material";
import { productContext } from "../../../App";
import { useContext } from "react";

const SellData = () => {
  const { search } = useContext(productContext);
  const {
    handleGetAllBill,
    billData,
    setPaginationModel,
    paginationModel,
    open,
    setOpen,
    columns,
    sellLoading,
    setExpiryDate,
    setStartDate,
    reset,
    getValues,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    filterData,
    setFilterData,
  } = useSellData();
  // const [open, setOpen] = useState(false);
  const [filterDate, setFilterDate] = useState(null);

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
            <p className="content-wrapper-title">Sell Data</p>
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
                  take: "",
                  total_payment: 0,
                  start_date: "",
                  end_date: "",
                  add_take: 0,
                  dollar_price: 0,
                  buy_id: "",
                });
                setOpen(true);
              }}
            >
              Add Sell Bill
            </button>
          </div>
          {sellLoading ? (
            <LinearProgress
              sx={{
                backgroundColor: "white",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "gray",
                },
              }}
            />
          ) : (
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
                    <SellEntryData key={row.name} row={row} />
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
          )}
          <SellDataModel open={open} setOpen={setOpen} />
        </div>
      </Box>
    </>
  );
};

export const Wrapper = () => (
  <SellDataProvider>
    <SellData />
  </SellDataProvider>
);

export default Wrapper;
