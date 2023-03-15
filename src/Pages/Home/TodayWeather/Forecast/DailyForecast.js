import React from "react";
import { Grid, Typography } from "@mui/material";
import DailyForecastItem from "./DailyForecastItem";

const DailyForecast = ({ data }) => {
  let subHeader;
  const forecastList = [
    {
      time: "18:00",
      temperature: "20",
    },
    {
      time: "14:00",
      temperature: "60",
    },
  ];

  subHeader = (
    <Typography
      variant="h5"
      component="h5"
      sx={{
        fontSize: { xs: "10px", sm: "12px" },
        textAlign: "center",
        lineHeight: 1,
        color: "#04C4E0",
        fontFamily: "Roboto Condensed",
        marginBottom: "1rem",
      }}
    >
      {forecastList.length === 1
        ? "1 available forecast"
        : `3 available forecasts`}
    </Typography>
  );

  let content;

  content = (
    <Grid
      item
      container
      xs={12}
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "fit-content",
      }}
      spacing="4px"
    >
      {forecastList.map((item, idx) => (
        <Grid
          key={idx}
          item
          xs={4}
          sm={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{
            marginBottom: { xs: "1rem", sm: "0" },
          }}
        >
          <DailyForecastItem item={item} data={data} />
        </Grid>
      ))}
    </Grid>
  );

  // if (!noDataProvided && forecastList && forecastList.length === 0)
  //   subHeader = (
  //     <ErrorBox
  //       flex="1"
  //       type="info"
  //       margin="2rem auto"
  //       errorMessage="No available forecasts for tonight."
  //     />
  //   );

  return (
    <Grid container sx={{ marginTop: "2.9rem" }}>
      <Grid item xs={12}>
        <Typography
          variant="h5"
          component="h5"
          sx={{
            fontSize: { xs: "12px", sm: "16px", md: "18px" },
            color: "rgba(255,255,255,.7)",
            fontWeight: "600",
            lineHeight: 1,
            textAlign: "center",
            fontFamily: "Roboto Condensed",
            marginBottom: "0.3rem",
          }}
        >
          {"TODAY'S FORECAST"}
        </Typography>
        {subHeader}
      </Grid>
      {content}
    </Grid>
  );
};

export default DailyForecast;
