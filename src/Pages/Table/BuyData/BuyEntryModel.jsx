import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import Modal from "@mui/material/Modal";
import styles from "./BuyData.module.css";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Loader from "../../../Components/Loader/Loader";

export const BuyEntryModel = ({
  modelOpen,
  setModelOpen,
  handleAddBuyEntryBuyId,
  handleUpdateBuyEntryBuyId,
  currentData,
  setCurrentData,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      buy_entry_id: "",
      date: "",
      currency: "",
      price: "1",
      payment: 0,
      broker: "",
    },
  });
  const { currency, buy_entry_id, date } = watch();

  useEffect(() => {
    reset({
      ...getValues(),
      buy_entry_id: currentData ? currentData._id : "",
      date: currentData ? dayjs(currentData.start_date) : dayjs(new Date()),
      currency: currentData ? currentData.currency : "",
      price: currentData ? currentData.price : "1",
      payment: currentData ? currentData.payment : 0,
      broker: currentData ? currentData.brokerName : "",
    });
  }, [reset, getValues, currentData]);

  useEffect(() => {
    if (currency === "₹") {
      reset({
        ...getValues(),
        price: "1",
      });
    }
  }, [currency]);

  const handleClose = () => {
    setCurrentData();
    setModelOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
  };

  return (
    <Modal
      open={modelOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form
          onSubmit={handleSubmit(
            buy_entry_id ? handleUpdateBuyEntryBuyId : handleAddBuyEntryBuyId
          )}
        >
          <h2
            className="df-side-modal-title"
            style={{
              padding: "20px",
              color: "gray",
              background: "rgb(230, 230, 230)",
            }}
          >
            {buy_entry_id ? "Update entry" : "Add entry"}
          </h2>
          <div>
            <div
              className={styles["model-field"]}
              style={{
                height: "auto",
              }}
            >
              <FormControl>
                <InputLabel id="df-currency-select-label">Currency</InputLabel>
                <Select
                  labelId="df-currency-select-label"
                  label="company"
                  value={currency}
                  {...register("currency")}
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
              <TextField
                id="outlined-basic"
                label="$ Rate"
                disabled={currency === "₹"}
                variant="outlined"
                {...register("price")}
                margin="normal"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Date"
                    value={date}
                    onChange={(newValue) => {
                      reset({
                        ...getValues(),
                        date: newValue,
                      });
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <TextField
                id="outlined-basic"
                label="Payment"
                variant="outlined"
                {...register("payment")}
                margin="normal"
              />
              <TextField
                id="outlined-basic"
                label="Broker"
                variant="outlined"
                {...register("broker")}
                margin="normal"
              />
            </div>
            <div
              className={styles["button-div"]}
              style={{ padding: "0 20px 20px 20px", marginTop: "-10px" }}
            >
              <Button className="df-secondary-button" onClick={handleClose}>
                Close
              </Button>
              <Button
                className="df-primary-button"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader style={{ marginTop: "-30px", height: "48px" }} />
                ) : buy_entry_id ? (
                  "Update"
                ) : (
                  "Add"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Box>
    </Modal>
  );
};
