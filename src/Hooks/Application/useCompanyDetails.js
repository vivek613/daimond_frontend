import React, { useState } from "react";
import axios from "axios";
import { getCookies } from "../Auth/Cookies";

export const useCompanyDetails = (props) => {
  const [allCompanyData, setAllCompanyData] = useState([]);

  const tokenStr = getCookies("access_token");
  console.log(tokenStr);
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
        console.log("item", item);
        if (item.data.status) {
          setAllCompanyData(item.data.data);
        } else {
        }
      });
  };

  const columns = [{ field: "name", headerName: "Company name", width: 230 }];

  return { handleGetAllCompany, allCompanyData, columns };
};
