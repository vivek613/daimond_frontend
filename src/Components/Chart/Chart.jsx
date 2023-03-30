import React from "react";

import ReactApexChart from "react-apexcharts";
import styles from "./Chart.module.css";

const LineChart = ({
  chartData = [],
  xaxis: { categories, formatter: xAxisFormatter, labels, ...xaxisRest } = {
    categories: [],
  },
  yaxis: { formatter: yAxisFormatter, ...yaxisRest } = {},
  chartHeight = 250,
  ...restChartOptions
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
      animations: { enabled: false },
    },
    colors: ["var(--primary-color)"],
    stroke: {
      curve: "straight",
      width: 1,
    },
    grid: {
      borderColor: "var(--border-color)",
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
      axisTicks: {
        show: false,
      },
      labels: {
        formatter: xAxisFormatter,
        rotate: 0,
        style: {
          cssClass: styles.label,
        },
        ...labels,
      },
      ...xaxisRest,
    },
    legend: {
      show: false,
    },
    yaxis: {
      opposite: true,
      // tickAmount: 3,
      labels: {
        formatter: yAxisFormatter,
      },
      ...yaxisRest,
    },
    ...restChartOptions,
  };

  return (
    <ReactApexChart
      options={chartOptions}
      series={chartData}
      type="line"
      height={chartHeight}
    />
  );
};

export default LineChart;
