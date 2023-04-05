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

const SellData = () => {
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
  } = useSellData();
  // const [open, setOpen] = useState(false);
  const handleChange = (e) => {
    console.log(e);
  };

  useEffect(() => {
    handleGetAllBill();
  }, []);
  const Row = (props) => {
    const { row } = props;
    console.log("row", row);
    const [open, setOpen] = useState(false);

    const history = [{ date: "sss", customerId: "11", amount: "150" }];

    return (
      <>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={(e) => {
                setOpen(!open);
              }}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row?.company?.name}
          </TableCell>
          <TableCell align="right">{row?.description}</TableCell>
          <TableCell align="right">{row?.price}</TableCell>
          <TableCell align="right">{row?.currency_type}</TableCell>
          <TableCell align="right">{row?.total_payment}</TableCell>
          <TableCell align="right">{row?.due_days}</TableCell>
          <TableCell align="right">{row?.start_date}</TableCell>
          <TableCell align="right">{row?.end_date}</TableCell>
        </TableRow>
        <TableRow style={{ background: "aliceblue" }}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Total price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {history?.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.customerId}</TableCell>
                        <TableCell align="right">{historyRow.amount}</TableCell>
                        <TableCell align="right">
                          {Math.round(historyRow.amount)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  return (
    <>
      <Box sx={{ height: "calc(100vh - 64px)", width: "100%" }}>
        <Navbar />
        <div className="content-wrapper">
          <div className="content-wrapper-button-div">
            <p className="content-wrapper-title">Sell Data</p>
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
            </Button>
          </div>
          {sellLoading ? (
            <p>loading</p>
          ) : (
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
                    <Row key={row.name} row={row} />
                  ))}
                </TableBody>
              </Table>
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
