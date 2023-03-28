import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styles from "./BuyData.module.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useBillData } from "../../../Hooks/Application/useBillData";
import Grid from "@mui/system/Unstable_Grid/Grid";

export function BuyDataModel({ open, setOpen }) {
  const {
    handleOnSubmit,
    expiryDate,
    setExpiryDate,
    startDate,
    setStartDate,
    allCompanyData,
    handleGetAllCompany,
    companyID,
    setCompanyID,
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
  } = useBillData();

  const {
    company_name,
    currency_type,
    buy_id,
    give,
    price,
    total_payment,
  } = watch();
  const handleClose = () => setOpen(false);
  const handleChange = (e) => {
    console.log(e.target.value);
    setCompanyID(e.target.value);
  };
  console.log(price);

  useEffect(() => {
    handleGetAllCompany();
  }, []);

  useEffect(() => {
    reset({
      ...getValues(),

      // price: currency_type === "Rs" ? 0 : 0,

      total_payment: currency_type === "Doller" ? give * price : give,
    });
  }, [currency_type, price, give]);
  console.log(total_payment);

  return (
    <div>
      <Drawer anchor={"right"} open={open} onClose={handleClose}>
        <Box sx={{ width: 500, padding: "15px", marginTop: "30px" }}>
          <h2 id="parent-modal-title">Add Buy</h2>
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className={styles["model-field"]}
          >
            <FormControl>
              <Select
                label="company"
                disabled={buy_id ? true : false}
                value={company_name}
                onChange={handleChange}
                {...register("company_name")}
              >
                {allCompanyData.map(({ name, _id }) => {
                  return (
                    <MenuItem key={_id} value={_id}>
                      {name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              {...register("description")}
            />

            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1 }}>
              <Grid item xs={6}>
                <Select
                  style={{
                    width: "100%",
                  }}
                  label="company"
                  value={currency_type}
                  // onChange={handleChange}
                  {...register("currency_type")}
                >
                  {["Rs", "Doller"].map((item) => {
                    return (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>
              <Grid item xs={6}>
                {currency_type === "Doller" && (
                  <TextField
                    id="outlined-basic"
                    label="price"
                    variant="outlined"
                    {...register("price")}
                  />
                )}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="due days"
                  variant="outlined"
                  {...register("due_days")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="give"
                  variant="outlined"
                  {...register("give")}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="remaining"
                  variant="outlined"
                  {...register("remaining")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  disabled
                  label="total payment"
                  // value={total}
                  variant="outlined"
                  {...register("total_payment")}
                />
              </Grid>
            </Grid>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="start date"
                  value={startDate}
                  onChange={(newValue) => {
                    setStartDate(newValue);
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Expiry date"
                  value={expiryDate}
                  onChange={(newValue) => {
                    setExpiryDate(newValue);
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <div className={styles["button-div"]}>
              <Button variant="outlined" onClick={handleClose}>
                Close
              </Button>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Box>
      </Drawer>
    </div>
  );
}
