import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import styles from "./Company.module.css";
import { useForm } from "react-hook-form";
import { useCompanyDetails } from "../../../Hooks";

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

export function CompanyModel() {
  const {
    handleOnSubmit,
    open,
    setOpen,
    handleAddCompany,
    handleUpdateCompany,
  } = useCompanyDetails();
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
  const onSubmit = (data) => {
    handleAddCompany(data);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p id="parent-modal-title">Add Company</p>
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className={styles["model-field"]}
          >
            <TextField
              id="outlined-basic"
              label="company_name"
              variant="outlined"
              {...register("company_name")}
            />
            <div className={styles["button-div"]}>
              <button className="df-primary-button" type="submit">
                Submit
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
