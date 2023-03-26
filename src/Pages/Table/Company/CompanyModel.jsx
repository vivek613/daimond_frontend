import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import styles from "./Company.module.css";

import { useForm } from "react-hook-form";

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
  p: 4,
};

export function CompanyModel({ open, setOpen }) {
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
  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 id="parent-modal-title">Add Company</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles["model-field"]}
          >
            <TextField
              id="outlined-basic"
              label="company_name"
              variant="outlined"
              {...register("company_name")}
            />

            <div className={styles["button-div"]}>
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
