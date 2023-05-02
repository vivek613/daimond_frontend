import React from "react";
import AirConditionsItem from "./AirConditionsItem";
import { Grid, Typography } from "@mui/material";
import { useLogin } from "../../../../Hooks/Auth/useLogin";

const TodayWeatherAirConditions = ({ data }) => {
  const { handleCheckLoginPage, loaginCheckLoading } = useLogin();
  const [value, setValue] = React.useState(false);
  const [value1, setValue1] = React.useState(false);
  const [value2, setValue2] = React.useState(false);

  const handleChange = (event) => {
    event === 0 ? setValue(true) : event === 1 ? setValue1(true) : setValue2(true);
    //function for set false after 10 seconds
    setTimeout(() => {
      event === 0 ? setValue(false) : event === 1 ? setValue1(false) : setValue2(false);
    }
      , 10000);

  };
  let content = (
    <>
      <AirConditionsItem title="Real Feel" value={`10 °C`} loading={value} type="temperature" onClick={() => handleChange(0)} />
      <AirConditionsItem title="Wind" value={`12 m/s`} loading={value1} type="wind" onClick={() => handleChange(1)} />
      <AirConditionsItem title="Clouds" value={`20 %`} loading={value2} type="clouds" onClick={() => handleChange(2)} />
      <AirConditionsItem
        title="Humidity"
        value={`25 %`}
        type="humidity"
        loading={loaginCheckLoading}
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
