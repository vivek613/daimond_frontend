import React, { useState } from "react";
import axios from "axios";
import { getCookies } from "../Auth/Cookies";

export const useBillData = (props) => {
  const [allCompanyData, setAllCompanyData] = useState([]);

  const tokenStr = getCookies("access_token");
  console.log(tokenStr);
  //------------------------ FOR LOGIN USER ------------------------//
  const handleGetAllBill = async (props) => {
    await axios
      .post(
        "http://localhost:5000/api/bills/allBills",
        {
          skip: 7,
          take: 3,
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
        } else {
        }
      });
  };

  return { handleGetAllBill };
};
