import React from "react";
import { Navbar } from "../../Navbar/Navbar";

import { Box, LinearProgress } from "@mui/material";
import {
  AllDataProvider,
  useAllData,
} from "../../../Hooks/Application/useAllData";
import { useEffect } from "react";
import { Table } from "../../../Components";
import { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
const columns = [
  { field: "company_name", headerName: "Company Name", width: 200 },
  { field: "total_buy", headerName: "Total buy", width: 200 },
  { field: "total_sell", headerName: "Total sell", width: 200 },
];
const Body = ({
  chartData = [],
  xaxis: { categories, formatter: xAxisFormatter, labels, ...xaxisRest } = {
    categories: [],
  },
  yaxis: yaxis,
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
    yaxis: yaxis,
  };

  return (
    <>
      <ReactApexChart
        options={chartOptions}
        series={chartData && chartData}
        type="line"
        height={280}
      />
    </>
  );
};
const AllData = () => {
  const { handleGetAllBill, allData, allDataLoading } = useAllData();
  useEffect(() => {
    handleGetAllBill();
  }, []);
  var max = Math.max.apply(
    null,
    allData?.dateWiseData?.reverse().map((item) => item.buy)
  ); // Calculate the maximum value from your data
  var maxY = max > 5 ? Math.ceil(max / 5) * 5 : 5;
  const chartData = useMemo(() => {
    console.log("maxY", maxY);
    return {
      chartData: [
        {
          name: "Total Buy",
          data: allData?.dateWiseData?.reverse().map((i) => i.buy),
        },
        {
          name: "Total Sell",
          data: allData?.dateWiseData?.reverse().map((i) => i.sell),
        },
      ],
      xaxis: {
        categories: allData?.dateWiseData?.reverse().map((i) => i.date),
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
  }, [allData]);
  return (
    <Box sx={{ height: "calc(100vh - 64px)", width: "100%" }}>
      <Navbar />

      <div className="content-wrapper">
        <div className="content-wrapper-button-div">
          <p className="content-wrapper-title">All Data</p>
        </div>
        {allDataLoading ? (
          <LinearProgress />
        ) : (
          <>
            <Body {...chartData} />

            <Table
              data={allData?.allCompaniesData || []}
              columns={columns}
              pageSize={10}
              sx={{ height: "500px" }}
              getRowId={(row) => row.company_id}
              // loading={companyLoading}
            />
          </>
        )}
      </div>
    </Box>
  );
};

export const Wrapper = () => (
  <AllDataProvider>
    <AllData />
  </AllDataProvider>
);

export default Wrapper;
