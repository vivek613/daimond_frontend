import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import styles from "./BuyData.module.css";

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
import { getCookies } from "../../../Hooks/Auth/Cookies";
import axios from "axios";
import { MdEdit, MdDelete } from "react-icons/md";
import { Button } from "@mui/material";
import { BuyEntryModel } from "./BuyEntryModel";

export const BuyEntryData = (props) => {
  const tokenStr = getCookies("access_token");
  const { row } = props;
  const [open1, setOpen1] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [buyEntry, setBuyEntry] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const history = [{ date: "sss", customerId: "11", amount: "150" }];
  const handleGetAllEntryById = async (id) => {
    setIsloading(true);
    await axios
      .get(
        `${process.env.REACT_APP_URL}buy/getEntry/${id}`,

        {
          headers: { Authorization: `Bearer ${tokenStr}` },
        }
      )
      .then((item) => {
        console.log(item);
        if (item.data.status) {
          setIsloading(false);

          setBuyEntry(item?.data?.data);
          // setAllCompanyData(item.data.data);
        } else {
          setIsloading(false);
        }
      })
      .catch((err) => {
        setIsloading(false);
      });
  };
  useEffect(() => {
    open1 && handleGetAllEntryById(row._id);
  }, [row, open1]);
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={(e) => {
              setOpen1(!open1);
            }}
          >
            {open1 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
          <Collapse in={open1} timeout="auto" unmountOnExit>
            {isLoading ? (
              <p>loading</p>
            ) : (
              <Box sx={{ margin: 1 }}>
                <div className={styles["header-div"]}>
                  <Typography variant="h6" gutterBottom component="div">
                    History
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setModelOpen(true);
                    }}
                  >
                    Add Entry
                  </Button>
                </div>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell align="right">currency</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Payment </TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {buyEntry?.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell className={styles["date-column"]}>
                          {historyRow.createdAt.substring(0, 12)}
                        </TableCell>
                        <TableCell align="right">
                          {historyRow.currency}
                        </TableCell>
                        <TableCell align="right">{historyRow.price}</TableCell>
                        <TableCell align="right">
                          {Math.round(historyRow.payment)}
                        </TableCell>
                        <TableCell align="right">
                          <div className={styles["action-column"]}>
                            <MdEdit size={20} />
                            <MdDelete size={20} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
      <BuyEntryModel setModelOpen={setModelOpen} modelOpen={modelOpen} />
    </>
  );
};