import React, { useContext, useState, createContext } from "react";
import axios from "axios";
import { getCookies } from "../Auth/Cookies";


const ctx = createContext();

export const useAllData = () => useContext(ctx);

export const AllDataProvider = ({ children }) => {
    const tokenStr = getCookies("access_token");
    const [allData, setAllData] = useState([]);
    const [allDataLoading, setAllDataLoading] = useState(false);
    const handleGetAllBill = async (props) => {
        setAllDataLoading(true);
        await axios
            .get(
                `${process.env.REACT_APP_URL}company/reportData`,

                {
                    headers: { Authorization: `Bearer ${tokenStr}` },
                }
            )
            .then((item) => {
                setAllDataLoading(false);
                if (item.data.status) {
                    setAllData(item.data.data);
                } else {
                    setAllData([]);
                    setAllDataLoading(false);
                }
            });
    };

    return (
        <ctx.Provider
            value={{
                handleGetAllBill, allData, allDataLoading
            }}
        >
            {children}
        </ctx.Provider>
    );
};
