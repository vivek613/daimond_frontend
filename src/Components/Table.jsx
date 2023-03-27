import React from "react";
import { DataGrid } from "@mui/x-data-grid";

export const Table = ({
  data,
  columns,
  pageSize,
  rowsPerPageOptions,
  ...rest
}) => {
  return (
    <DataGrid
      rows={data}
      columns={columns}
      pageSize={pageSize}
      rowsPerPageOptions={[rowsPerPageOptions]}
      paginationMode="server"
      {...rest}
    />
  );
};
