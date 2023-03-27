import React, { useContext, useState, createContext } from "react";
import axios from "axios";
import { getCookies } from "../Auth/Cookies";

const ctx = createContext();
export const useCompanyDetails = () => useContext(ctx);

export const CompanyDetailsProvider = ({ children }) => {
  const [allCompanyData, setAllCompanyData] = useState([]);
  const [open, setOpen] = useState();

  const tokenStr = getCookies("access_token");
  //------------------------ FOR LOGIN USER ------------------------//
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
  console.log(open);

  const columns = [{ field: "name", headerName: "Company name", width: 230 }];

  return (
    <ctx.Provider
      value={{
        handleGetAllCompany,
        allCompanyData,
        columns,
        handleOnSubmit,
        open,
        setOpen,
      }}
    >
      {children}
    </ctx.Provider>
  );
};
