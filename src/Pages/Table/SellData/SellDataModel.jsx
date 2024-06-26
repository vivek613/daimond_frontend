/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styles from "./SellData.module.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Grid from "@mui/system/Unstable_Grid/Grid";
import { useSellData } from "../../../Hooks/Application/useSellData";
import { InputLabel } from "@mui/material";
import Loader from "../../../Components/Loader/Loader";

export function SellDataModel({ open, setOpen }) {
  const {
    handleOnSubmit,
    expiryDate,
    setExpiryDate,
    startDate,
    setStartDate,
    allCompanyData,
    handleGetAllCompany,
    register,
    handleSubmit,
    watch,
    sellLoading,
    errors,
  } = useSellData();

  const { company_name, buy_id } = watch();
  const handleClose = () => setOpen(false);

  useEffect(() => {
    handleGetAllCompany();
  }, []);

  return (
    <div>
      <Drawer anchor={"right"} open={open} onClose={handleClose}>
        <Box sx={{ width: 500 }}>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <div className="df-side-modal-header">
              <h2 className="df-side-modal-title">
                {buy_id ? "Update bill" : "Add bill"}
              </h2>
              <div className={styles["button-div"]}>
                <Button className="df-secondary-button" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  className="df-primary-button"
                  type="submit"
                  disabled={sellLoading}
                >
                  {sellLoading ? (
                    <Loader style={{ marginTop: "-30px", height: "48px" }} />
                  ) : buy_id ? (
                    "Update"
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </div>
            <div className={styles["model-field"]}>
              <FormControl>
                <InputLabel id="df-company-select-label">Company</InputLabel>
                <Select
                  labelId="df-company-select-label"
                  label="company"
                  disabled={buy_id ? true : false}
                  value={company_name}
                  {...register("company_name", {
                    required: "This is required.",
                  })}
                  helperText={errors?.company_name?.message}
                  inValid={Boolean(errors?.company_name?.message)}
                  error={Boolean(errors?.company_name?.message)}
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
                minRows={2}
                multiline
                margin="normal"
              />
              <TextField
                id="outlined-basic"
                label="Bill no"
                variant="outlined"
                {...register("price")}
                className="df-text-field"
                margin="normal"
              />
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1 }}>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Total payment"
                    variant="outlined"
                    {...register("total_payment")}
                    className="df-text-field"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Due days"
                    variant="outlined"
                    {...register("due_days", {
                      required: "This is required.",
                    })}
                    helperText={errors?.due_days?.message}
                    inValid={Boolean(errors?.due_days?.message)}
                    error={Boolean(errors?.due_days?.message)}
                    className="df-text-field"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Start date"
                        disablePast
                        value={startDate}
                        onChange={(newValue) => {
                          setStartDate(newValue);
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
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
                </Grid>
              </Grid>
            </div>
          </form>
        </Box>
      </Drawer>
    </div>
  );
}
