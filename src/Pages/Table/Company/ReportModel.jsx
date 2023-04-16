/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useCompanyDetails } from "../../../Hooks";
import Button from "@mui/material/Button";

import ReactApexChart from "react-apexcharts";
import { Table } from "../../../Components";
import { findMax } from "../../../Hooks/Auth/Cookies";

const Sellcolumns = [
  {
    field: "start_date",
    headerName: "Start Date",
    width: 150,
    renderCell: (data) => {
      return (
        <div>
          {new Date(data.row.start_date).toLocaleDateString().split("GMT")[0]}
        </div>
      );
    },
  },
  {
    field: "price",
    headerName: "Bill no",
    width: 150,
  },
  {
    field: "total_payment",
    headerName: "Total Payment",
    width: 170,
    renderCell: (data) => <>{data.row.total_payment.toLocaleString()}</>,
  },
  {
    field: "description",
    headerName: "Description",
    width: 230,
  },
];
const Buycolumns = [
  {
    field: "start_date",
    headerName: "Start Date",
    width: 150,
    renderCell: (data) => {
      return (
        <div>
          {new Date(data.row.start_date).toLocaleDateString().split("GMT")[0]}
        </div>
      );
    },
  },
  {
    field: "price",
    headerName: "Bill no",
    width: 150,
  },
  {
    field: "total_payment",
    headerName: "Total Payment",
    width: 170,
    renderCell: (data) => <>{data.row.total_payment.toLocaleString()}</>,
  },
  {
    field: "description",
    headerName: "Description",
    width: 230,
  },
];

const Body = ({
  chartData = [],
  xaxis: { categories, formatter: xAxisFormatter, labels, ...xaxisRest } = {
    categories: [],
  },
}) => {
  const chartOptions = {
    chart: {
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      width: "100%",
    },
    colors: ["#FF0000", "#e88cf4"],
    stroke: {
      curve: "straight",
      width: 1,
    },
    grid: {
      borderColor: "gray",
      row: {
        colors: ["transparent"],
      },
    },
    xaxis: {
      categories,
      tooltip: {
        enabled: false,
      },
      axisBorder: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    yaxis: {
      tickAmount: 3,
    },
  };

  return (
    <>
      <ReactApexChart
        options={chartOptions}
        series={chartData}
        type="line"
        height={280}
      />
    </>
  );
};
const ReportModel = () => {
  const { companyReport, openReport, setOpenReport } = useCompanyDetails();

  var maxY = findMax(
    companyReport?.graphData?.reverse().map((item) => item.total_buy),
    companyReport?.graphData?.reverse().map((item) => item.total_sell)
  );
  const chartData = useMemo(() => {
    return {
      chartData: [
        {
          name: "Total Buy",
          data: companyReport?.graphData?.map((i) => i.total_buy),
        },
        {
          name: "Total Sell",
          data: companyReport?.graphData?.map((i) => i.total_sell),
        },
      ],
      xaxis: {
        categories: companyReport?.graphData?.reverse().map((i) => i.date),
      },
      yaxis: {
        opposite: false,
        tickAmount: 5,
        min: 0,
        max: maxY,
        // formatter: (val) =>
        //   val === 0 ? "00" : `${val.toString().padStart(2, "0")}%`,
      },
      noData: {
        text: "No Data Found ",
        align: "center",
        verticalAlign: "middle",
        offsetX: 0,
        offsetY: 0,
        style: {
          color: "black",
          fontSize: "20px",
        },
      },
    };
  }, [companyReport]);

  return (
    <div>
      <Drawer
        anchor={"right"}
        open={openReport}
        onClose={() => {
          setOpenReport(false);
        }}
      >
        <div style={{ padding: "20px" }}>
          <Box sx={{ width: "1000px", padding: "15px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2 id="parent-modal-title">Report</h2>
              <Button
                variant="outlined"
                className="df-secondary-button"
                onClick={() => {
                  setOpenReport(false);
                }}
              >
                Close
              </Button>
            </div>
            <Body {...chartData} />
          </Box>

          <h2 id="parent-modal-title">Sell Data</h2>
          <Table
            data={companyReport?.tableData?.sellData}
            columns={Sellcolumns}
            pageSize={10}
            getRowId={(row) => row._id}
            // loading={companyLoading}
            sx={{ height: "500px" }}
          />

          <h2 id="parent-modal-title" style={{ marginTop: "30px" }}>
            Buy Data
          </h2>
          <Table
            data={companyReport?.tableData?.buyData}
            columns={Buycolumns}
            pageSize={10}
            sx={{ height: "500px" }}
            getRowId={(row) => row._id}
            // loading={companyLoading}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default ReportModel;
