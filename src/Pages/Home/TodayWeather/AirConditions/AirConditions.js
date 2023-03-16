import React from "react";
import AirConditionsItem from "./AirConditionsItem";
import { Grid, Typography } from "@mui/material";
import { useLogin } from "../../../../Hooks/Auth/useLogin";

const TodayWeatherAirConditions = ({ data }) => {
  const { handleCheckLoginPage } = useLogin();

  let content = (
    <>
      <AirConditionsItem title="Real Feel" value={`10 °C`} type="temperature" />
      <AirConditionsItem title="Wind" value={`12 m/s`} type="wind" />
      <AirConditionsItem title="Clouds" value={`20 %`} type="clouds" />
      <AirConditionsItem
        title="Humidity"
        value={`25 %`}
        type="humidity"
        onClick={() => {
          handleCheckLoginPage();
        }}
      />
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
          {"AIR CONDITIONS"}
        </Typography>
      </Grid>
      {content}
    </Grid>
  );
};

export default TodayWeatherAirConditions;
