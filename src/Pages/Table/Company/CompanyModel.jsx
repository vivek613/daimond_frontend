import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import styles from "./Company.module.css";
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
  // p: 4,
};

export function CompanyModel() {
  const {
    handleOnSubmit,
    open,
    setOpen,
    handleUpdateCompany,
    register,
    handleSubmit,
    watch,
  } = useCompanyDetails();

  const { id } = watch();
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2
            id="parent-modal-title"
            style={{
              padding: "20px",
              borderBottom: "1px solid gray",
              color: "gray",
            }}
          >
            {id ? "Update company" : "Add company"}
          </h2>
          <form
            onSubmit={handleSubmit(id ? handleUpdateCompany : handleOnSubmit)}
            className={styles["model-field"]}
            style={{ padding: "20px" }}
          >
            <TextField
              margin="normal"
              id="outlined-basic"
              label="Company name"
              variant="outlined"
              {...register("company_name", { required: true })}
            />
            <TextField
              margin="normal"
              id="outlined-basic"
              label="Description"
              variant="outlined"
              {...register("company_description")}
            />
            <div
              className={styles["button-div"]}
              style={{ display: "flex", gap: "10px" }}
            >
              <button
                className="df-primary-button"
                onClick={() => {
                  handleClose();
                }}
              >
                Cancel
              </button>
              <button className="df-primary-button" type="submit">
                {id ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
