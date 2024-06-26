import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import styles from "./Company.module.css";
import { useCompanyDetails } from "../../../Hooks";
import Loader from "../../../Components/Loader/Loader";
import { Button } from "@mui/material";

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
    errors,
    watch,
    companyLoading,
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
              color: "gray",
              background: "rgb(230, 230, 230)",
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
              {...register("company_name", {
                required: "this field is required",
              })}
              helperText={errors?.company_name?.message}
              error={Boolean(errors?.company_name?.message)}
              onInvalid={Boolean(errors?.company_name?.message)}
            />
            <TextField
              margin="normal"
              id="outlined-basic"
              label="Description"
              variant="outlined"
              minRows={3}
              multiline
              {...register("company_description")}
            />
            <div
              className={styles["button-div"]}
              style={{ display: "flex", gap: "10px" }}
            >
              <Button
                className="df-secondary-button"
                onClick={() => {
                  handleClose();
                }}
              >
                Cancel
              </Button>
              <Button
                className="df-primary-button"
                type="submit"
                disabled={companyLoading}
              >
                {companyLoading ? (
                  <Loader style={{ marginTop: "-30px", height: "48px" }} />
                ) : id ? (
                  "Update"
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
