/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import styles from "./SellData.module.css";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";
import { LinearProgress } from "@mui/material";
import { SellEntryModel } from "./SellEntryModel";
import { useSellData } from "../../../Hooks/Application/useSellData";
import { toast } from "react-hot-toast";
import { ReactComponent as EditIcon } from "../../../assets/editIcon.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/deleteIcon.svg";

export const SellEntryData = (props) => {
  const { handleEditOpenBuyModal, handleDeleteBuy } = useSellData();

  const tokenStr = sessionStorage.getItem("access_token");
  const { row } = props;
  const [open1, setOpen1] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [buyEntry, setBuyEntry] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [currentData, setCurrentData] = useState();

  const handleGetAllEntryById = async (id) => {
    setIsloading(true);
    await axios
      .get(
        `${process.env.REACT_APP_URL}sell/getEntry/${id}`,

        {
          headers: { Authorization: `Bearer ${tokenStr}` },
        }
      )
      .then((item) => {
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

  const handleSellEntryDelete = async (id) => {
    setIsloading(true);
    await axios
      .delete(`${process.env.REACT_APP_URL}sell/deleteEntry/${id}`, {
        headers: { Authorization: `Bearer ${tokenStr}` },
      })
      .then((item) => {
        if (item.data.status) {
          setModelOpen(false);
          setIsloading(false);
          handleGetAllEntryById(row._id);
          toast.success(item?.data?.message);
          setCurrentData();
        } else {
          setIsloading(false);
          toast.error(item?.data?.message);
        }
      })
      .catch((err) => {
        setIsloading(false);
      });
  };
  const handleAddBuyEntryBuyId = async (props) => {
    setIsloading(true);
    await axios
      .post(
        `${process.env.REACT_APP_URL}/sell/addEntry`,
        {
          sell_data_id: row._id,
          currency: props.currency,
          price: props.price,
          payment: props.payment,
          brokerName: props.broker,
          start_date: new Date(props.date).toLocaleString(),
        },
        {
          headers: { Authorization: `Bearer ${tokenStr}` },
        }
      )
      .then((item) => {
        if (item.data.status) {
          setModelOpen(false);
          setIsloading(false);
          handleGetAllEntryById(row._id);
          setCurrentData();
          toast.success(item?.data?.message);
        } else {
          toast.error(item?.data?.message);
          setIsloading(false);
        }
      })
      .catch((err) => {
        setIsloading(false);
      });
  };

  const handleUpdateBuyEntryBuyId = async (props) => {
    setIsloading(true);
    await axios
      .post(
        `${process.env.REACT_APP_URL}/sell/updateEntry`,
        {
          id: props.sell_entry_id,
          start_date: new Date(props.date).toLocaleString(),

          currency: props.currency,
          price: props.price,
          payment: props.payment,
          brokerName: props.broker,
        },
        {
          headers: { Authorization: `Bearer ${tokenStr}` },
        }
      )
      .then((item) => {
        if (item.data.status) {
          setModelOpen(false);
          handleGetAllEntryById(row._id);
          setCurrentData();
          setIsloading(false);
          toast.success(item?.data?.message);
        } else {
          toast.error(item?.data?.message);
          setIsloading(false);
        }
      })
      .catch((err) => {
        setIsloading(false);
      });
  };
  const handleTotal = () => {
    return buyEntry
      .map(({ payment, price }) => payment * price)
      .reduce((sum, i) => sum + i, 0)
      .toLocaleString();
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
        <TableCell align="right">
          {row?.total_payment.toLocaleString()}
        </TableCell>
        <TableCell align="right">{row?.due_days}</TableCell>
        <TableCell align="right">{row?.start_date?.substring(0, 10)}</TableCell>
        <TableCell align="right">{row?.end_date?.substring(0, 10)}</TableCell>
        <TableCell
          align="right"
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "end",
            height: "40px",
            flexDirection: "unset",
          }}
        >
          <EditIcon
            className="df-action-edit-icon"
            onClick={() => handleEditOpenBuyModal(row)}
          />
          <DeleteIcon
            onClick={() => {
              handleDeleteBuy(row._id);
            }}
          />
        </TableCell>
      </TableRow>
      <TableRow className="history-table">
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open1} timeout="auto" unmountOnExit>
            {isLoading ? (
              <LinearProgress
                sx={{
                  backgroundColor: "white",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "gray",
                  },
                }}
              />
            ) : (
              <Box sx={{ margin: 1 }}>
                <div className={styles["header-div"]}>
                  <Typography variant="h6" gutterBottom component="div">
                    History
                  </Typography>
                  <button
                    className="df-primary-button"
                    onClick={() => {
                      setModelOpen(true);
                    }}
                  >
                    Add Entry
                  </button>
                </div>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell align="right">Currency</TableCell>
                      <TableCell align="right">$ Rate</TableCell>
                      <TableCell align="right">Payment </TableCell>
                      <TableCell align="right">Broker</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {buyEntry?.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell className={styles["date-column"]}>
                          {historyRow.start_date.substring(0, 10)}
                        </TableCell>
                        <TableCell align="right">
                          {historyRow.currency}
                        </TableCell>
                        <TableCell align="right">
                          {historyRow.price.toLocaleString()}
                        </TableCell>
                        <TableCell align="right">
                          {historyRow.payment.toLocaleString()}
                        </TableCell>
                        <TableCell align="right">
                          {historyRow?.brokerName}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            height: "40px",
                          }}
                        >
                          <div className={styles["action-column"]}>
                            <EditIcon
                              size={20}
                              onClick={() => {
                                setCurrentData(historyRow);
                                setModelOpen(true);
                              }}
                            />
                            <DeleteIcon
                              size={20}
                              onClick={() => {
                                handleSellEntryDelete(historyRow._id);
                              }}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell rowSpan={3} />
                      <TableCell colSpan={2}>Total Payment : </TableCell>
                      <TableCell align="right">{handleTotal()}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            )}
          </Collapse>
        </TableCell>
      </TableRow>

      <SellEntryModel
        setModelOpen={setModelOpen}
        modelOpen={modelOpen}
        handleAddBuyEntryBuyId={handleAddBuyEntryBuyId}
        handleUpdateBuyEntryBuyId={handleUpdateBuyEntryBuyId}
        currentData={currentData}
        setCurrentData={setCurrentData}
      />
    </>
  );
};
