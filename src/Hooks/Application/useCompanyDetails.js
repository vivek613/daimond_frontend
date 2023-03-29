import React, { useContext, useState, createContext } from "react";
import axios from "axios";
import { getCookies } from "../Auth/Cookies";
import { ReactComponent as EditIcon } from "../../assets/editIcon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/deleteIcon.svg";
import { changeSectionValueFormat } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";
import { useForm } from "react-hook-form";

const ctx = createContext();

export const useCompanyDetails = () => useContext(ctx);

export const CompanyDetailsProvider = ({ children }) => {
  const [allCompanyData, setAllCompanyData] = useState([]);
  const [open, setOpen] = useState();

  const tokenStr = getCookies("access_token");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      company_name: "",
      company_description: "",
    },
  });

  //------------------------ FOR GET ALL COMPANY ------------------------//
  const handleGetAllCompany = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_URL}company`
        , {
          skip: 0,
          take: 100,
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

  //------------------------ FOR ADD COMPANY ------------------------//
  const handleOnSubmit = async (data) => {
    await axios
      .post(
        `${process.env.REACT_APP_URL}company/add}`,
        {
          name: data.company_name,
          description: data.company_description,
        },
        {
          headers: { Authorization: `Bearer ${tokenStr}` },
        }
      )
      .then((item) => {
        if (item.data.status) {
          setOpen(false);
          handleGetAllCompany();
        } else {
        }
      });
  };

  //------------------------ FOR UPDATE COMPANY ------------------------//
  const handleUpdateCompany = async (props) => {
    await axios
      .post(
        `${process.env.REACT_APP_URL}company/update`,
        {
          id: props.id,
          name: props.company_name,
          description: props.company_description,
        },
        {
          headers: { Authorization: `Bearer ${tokenStr}` },
        }
      )
      .then((item) => {
        if (item.data.status) {
          setOpen(false);
          handleGetAllCompany();
          reset({
            ...getValues(),
            id: "",
            company_name: "",
            company_description: "",
          });
        } else {
        }
      });
  };

  //------------------------ FOR DELETE COMPANY ------------------------//
  const handleDeleteCompany = async (props) => {
    await axios
      .delete(`${process.env.REACT_APP_URL}company/${props.row._id}`, {
        headers: { Authorization: `Bearer ${tokenStr}` },
      })
      .then((item) => {
        if (item.data.status) {
          handleGetAllCompany();
        } else {
        }
      });
  };

  const customActionCell = (props) => {
    return (
      <>
        <div className="df-custom-action-cell">
          <div className="df-custom-edit-cell">
            <EditIcon
              className="df-action-edit-icon"
              onClick={() => {
                reset({
                  ...getValues(),
                  id: `${props.row._id}`,
                  company_name: `${props.row.name}`,
                  company_description: `${props.row.description}`,
                });
                setOpen(true);
              }}
            />
          </div>
          <div className="df-custom-delete-cell">
            <DeleteIcon
              className="df-action-delete-icon"
              onClick={() => {
                handleDeleteCompany(props);
              }}
            />
          </div>
        </div>
      </>
    );
  };

  const columns = [
    { field: "name", headerName: "Company name", width: 230 },
    {
      field: "description",
      headerName: "Description",
      width: 230,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 230,
      renderCell: (data) => customActionCell(data),
    },
  ];

  return (
    <ctx.Provider
      value={{
        handleGetAllCompany,
        allCompanyData,
        columns,
        handleOnSubmit,
        open,
        setOpen,
        handleUpdateCompany,
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
