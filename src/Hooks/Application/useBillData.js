import React, { useContext, useState } from "react";
import axios from "axios";
import { getCookies } from "../Auth/Cookies";
import { async } from "q";
import { productContext } from "../../App";
import { createContext } from "react";

const ctx = createContext();

export const useBillData = () => useContext(ctx);


export const BillDataProvider = ({ children }) => {
  const { open, setOpen } = useContext(productContext);
  const [allCompanyData, setAllCompanyData] = useState([]);
  const [billData, setBillData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });
  const [companyID, setCompanyID] = useState("");

  const tokenStr = getCookies("access_token");

  const handleGetAllCompany = async (props) => {
    await axios
      .post(
        "http://localhost:5000/api/company",
        {
          skip: 0,
          take: 10,
          search_text: "",
        },
        {
          headers: { Authorization: `Bearer ${tokenStr}` },
        }
      )
      .then((item) => {
        if (item.data.status) {
          setAllCompanyData(item.data.data);
        } else {
        }
      });
  };
  //------------------------ FOR LOGIN USER ------------------------//
  const handleGetAllBill = async (props) => {
    await axios
      .post(
        "http://localhost:5000/api/sell/all",
        {
          skip: paginationModel.page,
          take: paginationModel.pageSize,
          sort_model: {
            sort: "asc",
            field: "name",
          },
        },
        {
          headers: { Authorization: `Bearer ${tokenStr}` },
        }
      )
      .then((item) => {
        console.log("item", item);
        if (item.data.status) {
          setBillData(item.data);
        } else {
        }
      });
  };

  const handleOnSubmit = async (data) => {
    console.log("Fsdfsdf");
    await axios
      .post(
        "http://localhost:5000/api/sell/add",
        {
          company_id: "6421c5af42700326aaa397b6",
          description: data.description,
          currency_type: data.currency_type,
          total_payment: data.total_payment,
          remaining: data.remaining,
          price: data.price,
          due_days: data.due_days,
          end_date: expiryDate,
          start_date: startDate,
        },
        {
          headers: { Authorization: `Bearer ${tokenStr}` },
        }
      )
      .then((item) => {
        console.log("item", item);
        if (item.data.status) {
          setOpen(false);
          handleGetAllBill();
        } else {
        }
      });
  };


  return (
    <ctx.Provider
      value={{
        handleGetAllBill,
        handleOnSubmit,
        expiryDate,
        setExpiryDate,
        startDate,
        setStartDate,
        handleGetAllCompany,
        allCompanyData,
        setAllCompanyData,
        companyID,
        setCompanyID,
        billData,
        setPaginationModel,
        paginationModel,
      }}
    >
      {children}
    </ctx.Provider>)
};
