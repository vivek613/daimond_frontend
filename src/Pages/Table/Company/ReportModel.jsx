import React, { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useCompanyDetails } from "../../../Hooks";

import ReactApexChart from "react-apexcharts";
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
const ReportModel = ({}) => {
  const { companyReport, openReport, setOpenReport } = useCompanyDetails();
  const data = [
    {
      month: "Jan",
      sell: 4000,
      buy: 3501,
    },
    {
      month: "Feb",
      sell: 3000,
      buy: 3554,
    },
    {
      month: "Mar",
      sell: 2500,
      buy: 2000,
    },
    {
      month: "Apr",
      sell: 2780,
      buy: 2180,
    },
    {
      month: "May",
      buy: 1890,
      sell: 1790,
    },
    {
      month: "Jun",
      sell: 2390,
      buy: 2090,
    },
    {
      month: "Jul",
      sell: 3490,
      buy: 3790,
    },
    {
      month: "Aug",
      sell: 3490,
      buy: 3190,
    },
    {
      month: "Sep",
      buy: 3490,
      sell: 3990,
    },
    {
      month: "Oct",
      buy: 3400,
      sell: 3490,
    },
    {
      month: "Nov",

      sell: 3400,
      buy: 3290,
    },
    {
      month: "Dec",
      sell: 3490,
      buy: 3110,
    },
  ];

  var max = Math.max.apply(
    null,
    companyReport?.map((item) => item.buy)
  ); // Calculate the maximum value from your data
  var maxY = max > 5 ? Math.ceil(max / 5) * 5 : 5;
  const chartData = useMemo(() => {
    return {
      chartData: [
        {
          name: "Total Buy",
          data: companyReport?.map((i) => i.total_buy),
        },
        {
          name: "Total Sell",
          data: companyReport?.map((i) => i.total_sell),
        },
      ],
      xaxis: {
        categories: companyReport?.map((i) => i.month),
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
  }, [data]);

  return (
    <div>
      <Drawer
        anchor={"right"}
        open={openReport}
        onClose={() => {
          setOpenReport(false);
        }}
      >
        <Box sx={{ width: "1000px", padding: "15px", marginTop: "30px" }}>
          <h2 id="parent-modal-title">Report</h2>
          <Body {...chartData} />
        </Box>
      </Drawer>
    </div>
  );
};

export default ReportModel;
