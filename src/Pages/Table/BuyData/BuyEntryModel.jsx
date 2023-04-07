import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "./BuyData.module.css";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useBillData } from "../../../Hooks/Application/useBillData";
import { useForm } from "react-hook-form";

export const BuyEntryModel = ({
  modelOpen,
  setModelOpen,
  handleAddBuyEntryBuyId,
  handleUpdateBuyEntryBuyId,
  currentData,
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
      price: 0,
      payment: 0,
      broker: "",
    },
  });
  const { currency, buy_entry_id } = watch();
  console.log(currentData, currency);
  useEffect(() => {
    reset({
      ...getValues(),

      buy_entry_id: currentData ? currentData._id : "",
      date: currentData ? currentData.date : "",
      currency: currentData ? currentData.currency : "",
      price: currentData ? currentData.price : 0,
      payment: currentData ? currentData.payment : 0,
      broker: currentData ? currentData.broker : "",
    });
  }, [reset, getValues, currentData]);

  const handleClose = () => setModelOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 300,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
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
          <h2 className="df-side-modal-title">{"Add Entry"}</h2>
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
                variant="outlined"
                {...register("price")}
                margin="normal"
              />
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
            <div className={styles["button-div"]}>
              <Button variant="outlined" onClick={handleClose}>
                Close
              </Button>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Box>
    </Modal>
  );
};
