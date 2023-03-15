import React from "react";
import { Grid, Typography } from "@mui/material";
import CityDateDetail from "./CityDateDetail";
import TemperatureWeatherDetail from "./TemperatureWeatherDetail";

const Details = ({ data }) => {
  let content = (
    <>
      <Grid
        item
        xs={4}
        sx={{
          height: "80px",
        }}
      >
        <CityDateDetail />
      </Grid>
      <Grid
        item
        xs={4}
        sx={{
          height: "80px",
        }}
      >
        <TemperatureWeatherDetail />
      </Grid>
      <Grid
        item
        xs={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80px",
        }}
      ></Grid>
    </>
  );

  return (
    <Grid container>
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
            marginBottom: "1rem",
          }}
        >
          {"CURRENT WEATHER"}
        </Typography>
      </Grid>
      {content}
    </Grid>
  );
};

export default Details;
