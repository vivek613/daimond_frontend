import React, { useContext, useState, createContext } from "react";
import axios from "axios";
import { getCookies } from "../Auth/Cookies";
import { ReactComponent as EditIcon } from "../../assets/editIcon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/deleteIcon.svg";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { toast } from "react-hot-toast";
import { productContext } from "../../App";

const ctx = createContext();

export const useSellData = () => useContext(ctx);

export const SellDataProvider = ({ children }) => {
  const { search } = useContext(productContext);
  const [allCompanyData, setAllCompanyData] = useState([]);
  const [open, setOpen] = useState();
  const [dataCurrency, setDataCurrency] = useState();
  const [billData, setBillData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sellLoading, setSelloading] = useState(false);
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
      take: 0,
      add_take: 0,
      dollar_price: 0,
    },
  });

  const { buy_id } = watch();

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
  const handleGetAllBill = async () => {
    setSelloading(true);
    await axios
      .post(
        `${process.env.REACT_APP_URL}sell/all`,
        {
          skip: page * rowsPerPage,
          take: rowsPerPage,
          search_text: search,
        },
        {
          headers: { Authorization: `Bearer ${tokenStr}` },
        }
      )
      .then((item) => {
        setSelloading(false);
        if (item.data.status) {
          setBillData(item.data);
          setFilterData(item.data.data);
        } else {
          setBillData([]);
        }
      })
      .catch((err) => {
        setSelloading(false);
      });
  };

  const handleOnSubmit = async (data) => {
    try {
      setSelloading(true);
      if (buy_id) {
        await axios
          .post(
            `${process.env.REACT_APP_URL}sell/${buy_id}`,
            {
              company_id: data.company_name,
              description: data.description,
              currency_type: data.currency_type,
              total_payment: data.total_payment,
              remaining: data.total_payment,
              price: data.price,
              take: 0,
              due_days: data.due_days,
              end_date: expiryDate,
              start_date: startDate,
            },
            {
              headers: { Authorization: `Bearer ${tokenStr}` },
            }
          )
          .then((item) => {
            setSelloading(false);
            if (item.data.status) {
              toast.success(item?.data?.message);

              setOpen(false);
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
              handleGetAllBill();
            } else {
              toast.error(item?.data?.message);
            }
          })
          .catch((err) => {
            setSelloading(false);
          });
      } else {
        await axios
          .post(
            `${process.env.REACT_APP_URL}sell/add`,
            {
              company_id: data.company_name,
              description: data.description,
              currency_type: data.currency_type,
              total_payment: data.total_payment,
              remaining: data.total_payment,
              price: data.price,
              take: 0,
              due_days: data.due_days,
              end_date: expiryDate,
              start_date: startDate,
            },
            {
              headers: { Authorization: `Bearer ${tokenStr}` },
            }
          )
          .then((item) => {
            setSelloading(false);
            if (item.data.status) {
              toast.success(item?.data?.message);

              setOpen(false);
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
              handleGetAllBill();
            } else {
              toast.error(item?.data?.message);
            }
          })
          .catch((err) => {
            setSelloading(false);
          });
      }
    } catch (error) {
      setSelloading(false);
      console.log(error);
    }
  };

  const handleDeleteBuy = async (data) => {
    setSelloading(true);
    await axios
      .delete(`${process.env.REACT_APP_URL}sell/${data}`, {
        headers: { Authorization: `Bearer ${tokenStr}` },
      })
      .then((item) => {
        setSelloading(false);
        if (item.data.status) {
          handleGetAllBill();
          toast.success(item?.data?.message);
        } else {
          toast.error(item?.data?.message);
        }
      })
      .catch((err) => {
        setSelloading(false);
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
                setDataCurrency(row.currency_type);
                reset({
                  ...getValues(),
                  company_name: row.company_id,
                  description: row.description,
                  currency_type: row.currency_type,
                  price: row.price,
                  remaining: row.remaining,
                  due_days: row.due_days,
                  take: row.take,
                  total_payment: row.total_payment,
                  start_date: row.start_date,
                  end_date: row.end_date,
                  buy_id: row._id,
                  add_take: 0,
                  dollar_price: 0,
                });
                // setStartDate(row.start_date);
                // setExpiryDate(row.end_date);
                setOpen(true);
              }}
            />
          </div>
          <div className="df-custom-action-cell">
            <DeleteIcon
              className="df-action-delete-icon"
              onClick={() => {
                handleDeleteBuy(row._id);
              }}
            />
          </div>
        </div>
      </>
    );
  };

  const handleEditOpenBuyModal = (row) => {
    setExpiryDate(dayjs(row.end_date));
    setStartDate(dayjs(row.start_date));
    reset({
      ...getValues(),
      company_name: row.company._id,
      description: row.description,
      currency_type: row.currency_type,
      price: row.price,
      remaining: row.remaining,
      due_days: row.due_days,
      take: row.take,
      total_payment: row.total_payment,

      add_give: 0,
      dollar_price: 0,
      buy_id: row._id,
    });
    setOpen(true);
  };
  const columns = [
    {
      field: "company_name",
      headerName: "Company",
      flex: 1,
      renderCell: ({ row }) => row.company.name,
    },
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "price",
      headerName: "Bill No",
      maxWidth: 100,
      flex: 1,
    },
    {
      field: "currency_type",
      headerName: "₹ / $",
      maxWidth: 50,
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
      field: "take",
      headerName: "Take",
      sortable: true,
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
      field: "due_days",
      headerName: "Due days",
      sortable: false,
      maxWidth: 100,
      flex: 1,
    },
    {
      field: "start_date",
      headerName: "Start date",
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
        billData,
        rowsPerPage,
        setRowsPerPage,
        page,
        setPage,
        columns,
        open,
        setOpen,
        register,
        handleSubmit,
        watch,
        reset,
        getValues,
        sellLoading,
        dataCurrency,
        handleEditOpenBuyModal,
        handleDeleteBuy,
        filterData,
        setFilterData,
      }}
    >
      {children}
    </ctx.Provider>
  );
};
