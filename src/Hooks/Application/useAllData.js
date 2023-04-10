import React, { useContext, useState, createContext } from "react";
import axios from "axios";
import { getCookies } from "../Auth/Cookies";


const ctx = createContext();

export const useAllData = () => useContext(ctx);

export const AllDataProvider = ({ children }) => {
    const tokenStr = getCookies("access_token");
    const [allData, setAllData] = useState([]);
    const handleGetAllBill = async (props) => {
        await axios
            .get(
                `${process.env.REACT_APP_URL}company/reportData`,

                {
                    headers: { Authorization: `Bearer ${tokenStr}` },
                }
            )
            .then((item) => {
                if (item.data.status) {
                    setAllData(item.data.data);
                } else {
                }
            });
    };

    return (
        <ctx.Provider
            value={{
                handleGetAllBill, allData
            }}
        >
            {children}
        </ctx.Provider>
    );
};
