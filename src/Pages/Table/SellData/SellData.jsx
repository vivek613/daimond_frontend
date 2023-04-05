import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { Table } from "../../../Components/index";
import {
  SellDataProvider,
  useSellData,
} from "../../../Hooks/Application/useSellData";
import { Navbar } from "../../Navbar/Navbar";
import { SellDataModel } from "./SellDataModel";
import Button from "@mui/material/Button";

const SellData = () => {
  const {
    handleGetAllBill,
    billData,
    setPaginationModel,
    paginationModel,
    open,
    setOpen,
    columns,
    sellLoading,
    setExpiryDate,
    setStartDate,
    reset,
    getValues,
  } = useSellData();
  // const [open, setOpen] = useState(false);
  const handleChange = (e) => {
    console.log(e);
  };

  useEffect(() => {
    handleGetAllBill();
  }, []);

  return (
    <>
      <Box sx={{ height: "calc(100vh - 64px)", width: "100%" }}>
        <Navbar />
        <div className="content-wrapper">
          <div className="content-wrapper-button-div">
            <p className="content-wrapper-title">Sell Data</p>
            <Button
              variant="contained"
              onClick={() => {
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
                setOpen(true);
              }}
            >
              Add Sell Bill
            </Button>
          </div>
          <Table
            style={{
              height: "70%",
            }}
            data={(billData && billData.data) || []}
            rowCount={billData.rowsCount || 0}
            columns={columns}
            pageSize={5}
            getRowId={(row) => row._id}
            paginationModel={paginationModel}
            onPaginationModelChange={handleChange}
            loading={sellLoading}
          />
          <SellDataModel open={open} setOpen={setOpen} />
        </div>
      </Box>
    </>
  );
};

export const Wrapper = () => (
  <SellDataProvider>
    <SellData />
  </SellDataProvider>
);

export default Wrapper;
