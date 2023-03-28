import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { productContext } from "../../../App";
import { Table } from "../../../Components";
import {
  BillDataProvider,
  useBillData,
} from "../../../Hooks/Application/useBillData";
import { Navbar } from "../../Navbar/Navbar";
import { BillDataModel } from "./BillDataModel";
const columns = [
  { field: "company_name", headerName: "company", flex: 1 },
  { field: "description", headerName: "description", flex: 1 },
  {
    field: "currency_type",
    headerName: "currency",
    // type: "number",
    maxWidth: 90,
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
    field: "remaining",
    headerName: "Remaining",
    sortable: false,
    maxWidth: 100,
    flex: 1,
  },
  {
    field: "price",
    headerName: "price",
    sortable: false,
    maxWidth: 100,
    flex: 1,
  },
  {
    field: "due_days",
    headerName: "due Days",
    sortable: false,
    maxWidth: 100,
    flex: 1,
  },
  {
    field: "start_date",
    headerName: "start date",
    sortable: false,
    // width: 200,
    flex: 1,
  },
  {
    field: "end_date",
    headerName: "Expiry date",
    sortable: false,
    // width: 200,
    flex: 1,
  },
];

const BillData = () => {
  const { open, setOpen } = useContext(productContext);
  const { handleGetAllBill, billData, setPaginationModel, paginationModel } =
    useBillData();
  // const [open, setOpen] = useState(false);
  console.log(paginationModel);
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
            <p className="content-wrapper-title">bill Data</p>
            <button
              className="df-primary-button"
              onClick={() => {
                setOpen(true);
              }}
            >
              Add bill
            </button>
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
          />
          <BillDataModel open={open} setOpen={setOpen} />
        </div>
      </Box>
    </>
  );
};

export const Wrapper = () => (
  <BillDataProvider>
    <BillData />
  </BillDataProvider>
);

export default Wrapper;
