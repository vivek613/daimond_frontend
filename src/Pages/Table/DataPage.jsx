import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { Navbar } from "../index";
import { Table } from "../../Components/index";
import { useCompanyDetails } from "../../Hooks";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export const DataPage = () => {
  const { handleGetAllCompany } = useCompanyDetails();

  useEffect(() => {
    handleGetAllCompany();
  }, []);
  return (
    <Box sx={{ height: "calc(100vh - 64px)", width: "100%" }}>
      <Navbar />
      <div className="content-wrapper">
        <div className="content-wrapper-button-div">
          <p className="content-wrapper-title">Company Data</p>
          <button className="df-primary-button">Add Company</button>
        </div>
        <Table data={rows} columns={columns} pageSize={5} />
      </div>
    </Box>
  );
};
