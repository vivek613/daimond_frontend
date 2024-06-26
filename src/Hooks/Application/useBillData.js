import React, { useContext, useState, createContext } from "react";
import axios from "axios";
import { ReactComponent as EditIcon } from "../../assets/editIcon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/deleteIcon.svg";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { toast } from "react-hot-toast";

const ctx = createContext();

export const useBillData = () => useContext(ctx);

export const BillDataProvider = ({ children }) => {
  const [allCompanyData, setAllCompanyData] = useState([]);
  const [open, setOpen] = useState();
  const [dataCurrency, setDataCurrency] = useState();
  const [billData, setBillData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [buyLoading, setBuyLoading] = useState(false);
  const tokenStr = sessionStorage.getItem("access_token");
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
      add_give: 0,
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
          setAllCompanyData([]);
        }
      })
      .catch((err) => {
        setAllCompanyData([]);
        toast.error(err?.response?.data?.message);
      });
  };

  //------------------------ FOR GET ALL BILL ------------------------//
  const handleGetAllBill = async () => {
    setBuyLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_URL}buy/all`,
        {
          skip: page * rowsPerPage,
          take: rowsPerPage,
          search_text: "",
        },
        {
          headers: { Authorization: `Bearer ${tokenStr}` },
        }
      )
      .then((item) => {
        if (item.data.status) {
          setBuyLoading(false);
          setBillData(item?.data);
          setFilterData(item?.data?.data);
        } else {
          setBillData([]);
          setFilterData([]);
          setBuyLoading(false);
        }
      })
      .catch((err) => {
        setBuyLoading(false);
        setBillData([]);
        setFilterData([]);
      });
  };

  const handleOnSubmit = async (data) => {
    let newStartDate = new Date(startDate).toLocaleString();
    let newExpiryDate = new Date(expiryDate).toLocaleString();
    try {
      setBuyLoading(true);
      if (buy_id) {
        await axios
          .post(
            `${process.env.REACT_APP_URL}buy/${data.buy_id}`,
            {
              company_id: data.company_name,
              description: data.description,
              currency_type: dataCurrency,
              total_payment: data.total_payment,
              remaining: data.total_payment,
              price: data.price,
              give: 0,
              due_days: data.due_days,
              end_date: newExpiryDate,
              start_date: newStartDate,
            },
            {
              headers: { Authorization: `Bearer ${tokenStr}` },
            }
          )
          .then((item) => {
            setBuyLoading(false);
            if (item.data.status) {
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
                give: "",
                total_payment: 0,
                start_date: "",
                end_date: "",
                add_give: 0,
                dollar_price: 0,
                buy_id: "",
              });
              toast.success(item?.data?.message);

              handleGetAllBill();
            } else {
              toast.error(item?.data?.message);
            }
          })
          .catch((err) => {
            setBuyLoading(false);
            toast.error(err?.response?.data?.message);
          });
      } else {
        await axios
          .post(
            `${process.env.REACT_APP_URL}buy/add`,
            {
              company_id: data.company_name,
              description: data.description,
              currency_type: data.currency_type,
              total_payment: data.total_payment,
              remaining: data.total_payment,
              price: data.price,
              give: 0,
              due_days: data.due_days,
              end_date: newExpiryDate,
              start_date: newStartDate,
            },
            {
              headers: { Authorization: `Bearer ${tokenStr}` },
            }
          )
          .then((item) => {
            setBuyLoading(false);
            if (item.data.status) {
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
                give: "",
                total_payment: 0,
                start_date: "",
                end_date: "",
                add_give: 0,
                dollar_price: 0,
                buy_id: "",
              });
              toast.success(item?.data?.message);

              handleGetAllBill();
            } else {
              toast.error(item?.data?.message);
            }
          })
          .catch((err) => {
            setBuyLoading(false);
            toast.error(err?.response?.data?.message);
          });
      }
    } catch (error) {
      setBuyLoading(false);
      toast.error(error?.message);
    }
  };

  const handleDeleteBuy = async (data) => {
    setBuyLoading(true);
    await axios
      .delete(`${process.env.REACT_APP_URL}buy/${data}`, {
        headers: { Authorization: `Bearer ${tokenStr}` },
      })
      .then((item) => {
        setBuyLoading(false);
        if (item.data.status) {
          handleGetAllBill();
          toast.success(item?.data?.message);
        } else {
        }
      })
      .catch((err) => {
        setBuyLoading(false);
        toast.error(err?.response?.data?.message);
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
                  give: row.give,
                  total_payment: row.total_payment,
                  start_date: row.start_date,
                  end_date: row.end_date,
                  buy_id: row._id,
                  add_give: 0,
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
      give: row.give,
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
      field: "give",
      headerName: "Give",
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
        handleEditOpenBuyModal,
        expiryDate,
        setExpiryDate,
        startDate,
        setStartDate,
        handleGetAllCompany,
        allCompanyData,
        setAllCompanyData,
        billData,

        columns,
        open,
        setOpen,
        register,
        handleSubmit,
        watch,
        reset,
        getValues,
        buyLoading,
        dataCurrency,
        handleDeleteBuy,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        setBillData,
        filterData,
        setFilterData,
        errors,
        isValid,
      }}
    >
      {children}
    </ctx.Provider>
  );
};
