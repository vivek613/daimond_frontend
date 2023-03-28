import React, { useContext, useState, createContext } from "react";
import axios from "axios";
import { getCookies } from "../Auth/Cookies";
import { async } from "q";
import { productContext } from "../../App";
import { ReactComponent as EditIcon } from "../../assets/editIcon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/deleteIcon.svg";

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

  const customActionCell = ({ row }) => {
    console.log(row);
    return (
      <>
        <div className="df-custom-action-cell">
          <div className="df-custom-action-cell">
            <EditIcon
              className="df-action-edit-icon"
              onClick={() => {
                console.log("edit");
              }}
            />
          </div>
          <div className="df-custom-action-cell">
            <DeleteIcon
              className="df-action-delete-icon"
              onClick={() => {
                console.log("delete");
              }}
            />
          </div>
        </div>
      </>
    );
  };

  const columns = [
    { field: "company_name", headerName: "company", flex: 1 },
    { field: "description", headerName: "description", flex: 1 },
    {
      field: "currency_type",
      headerName: "currency",
      // type: "number",
      maxWidth: 90,
      flex: 1,
    },
    {
      field: "total_payment",
      headerName: "Total",
      sortable: false,
      maxWidth: 100,
      flex: 1,
    },
    {
      field: "remaining",
      headerName: "Remaining",
      sortable: false,
      maxWidth: 100,
      flex: 1,
    },
    {
      field: "price",
      headerName: "price",
      sortable: false,
      maxWidth: 100,
      flex: 1,
    },
    {
      field: "due_days",
      headerName: "due Days",
      sortable: false,
      maxWidth: 100,
      flex: 1,
    },
    {
      field: "start_date",
      headerName: "start date",
      sortable: false,
      width: 150,
      flex: 1,
    },
    {
      field: "end_date",
      headerName: "Expiry date",
      sortable: false,
      width: 150,

      flex: 1,
    },
    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      renderCell: customActionCell,
    },
  ];
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
        columns,
      }}
    >
      {children}
    </ctx.Provider>
  );
};
