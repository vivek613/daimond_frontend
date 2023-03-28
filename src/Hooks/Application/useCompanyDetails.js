import React, { useContext, useState, createContext } from "react";
import axios from "axios";
import { getCookies } from "../Auth/Cookies";
import { ReactComponent as EditIcon } from "../../assets/editIcon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/deleteIcon.svg";

const ctx = createContext();

export const useCompanyDetails = () => useContext(ctx);

export const CompanyDetailsProvider = ({ children }) => {
  const [allCompanyData, setAllCompanyData] = useState([]);
  const [open, setOpen] = useState();

  const tokenStr = getCookies("access_token");
  //------------------------ FOR LOGIN USER ------------------------//
  const handleGetAllCompany = async () => {
    await axios
      .post(
        "http://localhost:5000/api/company",
        {
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
  const handleAddCompany = async (props) => {
    await axios
      .post(
        "http://localhost:5000/api/company/add",
        {
          name: `${props.company_name}`,
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
        "http://localhost:5000/api/company/update",
        {
          id: "",
          name: "",
        },
        {
          headers: { Authorization: `Bearer ${tokenStr}` },
        }
      )
      .then((item) => {
        if (item.data.status) {
        } else {
        }
      });
  };

  const customActionCell = (props) => {
    console.log("props1111", props);
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

  const handleOnSubmit = async (data) => {
    await axios
      .post(
        "http://localhost:5000/api/company/add",
        {
          name: data.company_name,
        },
        {
          headers: { Authorization: `Bearer ${tokenStr}` },
        }
      )
      .then((item) => {
        console.log("item", item);

        if (item.data.status) {
          setOpen(false);
          handleGetAllCompany();
        } else {
        }
      });
  };

  return (
    <ctx.Provider
      value={{
        handleGetAllCompany,
        allCompanyData,
        columns,
        handleOnSubmit,
        open,
        setOpen,
        handleAddCompany,
        handleUpdateCompany,
      }}
    >
      {children}
    </ctx.Provider>
  );
};
