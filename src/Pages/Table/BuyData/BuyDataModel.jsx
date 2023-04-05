import React, { useEffect } from "react";
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
import { InputLabel } from "@mui/material";

export function BuyDataModel({ open, setOpen }) {
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
    dataCurrency,
    buyLoading,
  } = useBillData();

  const { company_name, currency_type, buy_id } = watch();
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
                {buy_id ? "Update Buy Bill" : "Add Buy Bill"}
              </h2>
              <div className={styles["button-div"]}>
                <Button variant="outlined" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="contained" type="submit" disabled={buyLoading}>
                  {buyLoading ? "Loading..." : buy_id ? "Update" : "Submit"}
                </Button>
              </div>
            </div>
            <div
              className={styles["model-field"]}
              style={{
                height: "auto",
              }}
            >
              <FormControl>
                <InputLabel id="df-company-select-label">Company</InputLabel>
                <Select
                  labelId="df-company-select-label"
                  label="company"
                  disabled={buy_id ? true : false}
                  value={company_name}
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
                <Grid item xs={12}>
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel id="df-currency-select-label">
                      Currency
                    </InputLabel>
                    <Select
                      labelId="df-currency-select-label"
                      label="company"
                      value={currency_type}
                      {...register("currency_type")}
                    >
                      {["₹", "$"].map((item, index) => {
                        return (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                {buy_id && (
                  <Grid
                    item
                    xs={buy_id && dataCurrency !== currency_type ? 6 : 12}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Add Give"
                      variant="outlined"
                      {...register("add_give")}
                      className="df-text-field"
                      margin="normal"
                    />
                  </Grid>
                )}
                {buy_id && dataCurrency !== currency_type && (
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="$ Price"
                      variant="outlined"
                      {...register("dollar_price")}
                      className="df-text-field"
                      margin="normal"
                    />
                  </Grid>
                )}
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    disabled={buy_id ? true : false}
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
                    label="Give"
                    variant="outlined"
                    {...register("give")}
                    className="df-text-field"
                    margin="normal"
                    disabled={buy_id ? true : false}
                  />
                </Grid>
                {!buy_id && (
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Remaining"
                      variant="outlined"
                      {...register("remaining")}
                      className="df-text-field"
                      margin="normal"
                    />
                  </Grid>
                )}
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Due days"
                    variant="outlined"
                    {...register("due_days")}
                    className="df-text-field"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Start date"
                        value={startDate}
                        disabled={buy_id ? true : false}
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
