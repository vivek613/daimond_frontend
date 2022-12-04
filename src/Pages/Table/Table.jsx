import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { Navbar } from "../index";

export const Table = () => {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 5,
  });
  return (
    <Box sx={{ height: "calc(100vh - 64px)", width: "100%" }}>
      <Navbar />
      <DataGrid {...data} />
    </Box>
  );
};
