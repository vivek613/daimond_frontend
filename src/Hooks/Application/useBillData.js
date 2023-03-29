import React, { useContext, useState, createContext } from "react";
import axios from "axios";
import { getCookies } from "../Auth/Cookies";
import { async } from "q";
import { productContext } from "../../App";
import { ReactComponent as EditIcon } from "../../assets/editIcon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/deleteIcon.svg";
import { useForm } from "react-hook-form";

const ctx = createContext();

export const useBillData = () => useContext(ctx);

export const BillDataProvider = ({ children }) => {
  const [allCompanyData, setAllCompanyData] = useState([]);
  const [open, setOpen] = useState();

  const [billData, setBillData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });
  const [companyID, setCompanyID] = useState("");

  const tokenStr = getCookies("access_token");
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    reset,

    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      company_name: "",
      currency_type: "",
      price: 0,
      buy_id: "",
      total_payment: 0,
      give: 0,
    },
  });

  const handleGetAllCompany = async (props) => {
    await axios
      .post(
        `${process.env.REACT_APP_URL}company`,
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
        `${process.env.REACT_APP_URL}buy/all`,
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
    console.log("Fsdfsdf", data);
    await axios
      .post(
        `${process.env.REACT_APP_URL}buy/add`,
        {
          company_id: data.company_name,
          description: data.description,
          currency_type: data.currency_type,
          total_payment: data.total_payment,
          remaining: data.remaining,
          price: data.price,
          give: data.give,
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
          });
          handleGetAllBill();
        } else {
        }
      });
  };

  const handleDeleteBuy = async (data) => {
    await axios
      .delete(
        `${process.env.REACT_APP_URL}buy/delete/${data}`,

        {
          headers: { Authorization: `Bearer ${tokenStr}` },
        }
      )
      .then((item) => {
        console.log("item", item);
        if (item.data.status) {
          // setOpen(false);
          handleGetAllBill();
        } else {
        }
      });
  };
  const customActionCell = ({ row }) => {
    return (
      <>
        <div className="df-custom-action-cell">
          <div className="df-custom-action-cell">
            <EditIcon
              className="df-action-edit-icon"
              onClick={() => {
                console.log(row);
                setOpen(true);
                reset({
                  ...getValues(),
                  company_name: row.company_id,
                  description: row.description,
                  currency_type: row.currency_type,
                  price: row.price,
                  remaining: row.remaining,
                  due_days: row.due_days,
                  give: row.give,
                  total_payment: row.total_payment,
                  start_date: row.start_date,
                  end_date: row.end_date,
                  buy_id: row._id,
                });
              }}
            />
          </div>
          <div className="df-custom-action-cell">
            <DeleteIcon
              className="df-action-delete-icon"
              onClick={() => {
                console.log(row);
                handleDeleteBuy(row._id);
              }}
            />
          </div>
        </div>
      </>
    );
  };

  const columns = [
    {
      field: "company_name", headerName: "company", flex: 1,
      renderCell: ({ row }) =>
        row?.company?.name
    },
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
      field: "give",
      headerName: "give",
      sortable: true,
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
        open,
        setOpen,
        register,
        handleSubmit,
        watch,
        reset,
        getValues,
      }}
    >
      {children}
    </ctx.Provider>
  );
};
