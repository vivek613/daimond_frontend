import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Link, SvgIcon, Typography } from "@mui/material";
import "./Home.css";
import TodayWeather from "../Home/TodayWeather/TodayWeather";

import Logo from "../../assets/logo.png";

const Home = () => {
  return (
    <div className={"main-div"}>
      <Container
        sx={{
          maxWidth: { xs: "95%", sm: "80%", md: "1100px" },
          width: "100%",
          height: "100%",
          margin: "0 auto",
          padding: "1rem 0 3rem",
          marginBottom: "1rem",
          borderRadius: {
            xs: "none",
            sm: "0 0 1rem 1rem",
          },
          boxShadow: {
            xs: "none",
            sm:
              "rgba(0,0,0, 0.5) 0px 10px 15px -3px, rgba(0,0,0, 0.5) 0px 4px 6px -2px",
          },
        }}
      >
        <Grid container columnSpacing={2}>
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                width: "100%",
                marginBottom: "1rem",
              }}
            >
              <Box
                component="img"
                sx={{
                  height: { xs: "16px", sm: "22px", md: "26px" },
                  width: "auto",
                }}
                alt="logo"
                src={Logo}
              />

              <Typography
                variant="h3"
                component="h3"
                sx={{
                  fontWeight: "400",
                  fontSize: { xs: "10px", sm: "12px" },
                  color: "rgba(255, 255, 255, .7)",
                  lineHeight: 1,
                  paddingRight: "2px",
                  fontFamily: "Poppins",
                }}
              >
                {new Date().toLocaleString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hourCycle: "h23",
                  timeZone: "UTC",
                })}{" "}
                GMT
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <Grid item xs={12}>
              <TodayWeather />
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* <WeeklyForecast /> */}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
