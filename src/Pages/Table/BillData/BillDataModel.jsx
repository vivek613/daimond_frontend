import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styles from "./BillData.module.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useForm } from "react-hook-form";
import { useCompanyDetails } from "../../../Hooks";
import { useBillData } from "../../../Hooks/Application/useBillData";
import Grid from "@mui/system/Unstable_Grid/Grid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  border: "none",
  borderRadius: "5px",
  padding: "10px",
  // height: 600,
  // overflow: "scroll",
};

export function BillDataModel({ open, setOpen }) {
  // const { allCompanyData, handleGetAllCompany } = useCompanyDetails();
  const {
    handleOnSubmit,
    expiryDate,
    setExpiryDate,
    startDate,
    setStartDate,
    allCompanyData,
    setAllCompanyData,
    handleGetAllCompany,
    companyID,
    setCompanyID,
  } = useBillData();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      company_name: "",
    },
  });
  const { company_name } = watch();
  const handleClose = () => setOpen(false);
  const handleChange = (e) => {
    // e.preventdefault();
    setCompanyID(e.target.value);
    console.log(e);
    console.log(companyID);
  };

  useEffect(() => {
    handleGetAllCompany();
  }, []);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <p id="parent-modal-title">Add bill</p>
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className={styles["model-field"]}
          >
            <FormControl>
              <Select label="company" value={companyID} onChange={handleChange}>
                {allCompanyData.map(({ name, _id }) => {
                  return (
                    <MenuItem key={_id} value={name}>
                      {name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 1, md: 2 }}
            >
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="Description"
                  variant="outlined"
                  {...register("description")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="currency type"
                  variant="outlined"
                  {...register("currency_type")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="total payment"
                  variant="outlined"
                  {...register("total_payment")}
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
                  label="price"
                  variant="outlined"
                  {...register("price")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="due days"
                  variant="outlined"
                  {...register("due_days")}
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
      </Modal>
    </div>
  );
}
