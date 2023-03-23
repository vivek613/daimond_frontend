import React, { useState } from "react";
import axios from "axios";

export const useCompanyDetails = (props) => {
  const [allCompanyData, setAllCompanyData] = useState([]);

  //------------------------ FOR LOGIN USER ------------------------//
  const handleGetAllCompany = async (props) => {
    await axios
      .post(
        "http://localhost:5000/api/company/?id=all",
        {},
        {
          withCredentials: true,
        }
      )
      .then((item) => {
        console.log("item", item);
        if (item.data.status) {
        } else {
        }
      });
  };

  return { handleGetAllCompany };
};
