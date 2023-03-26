import * as React from "react";
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

export function BillDataModel({ open, setOpen }) {
  const { allCompanyData, handleGetAllCompany } = useCompanyDetails();
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

  console.log(allCompanyData, company_name);
  React.useEffect(() => {
    handleGetAllCompany();
  }, []);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 id="parent-modal-title">Add bill</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles["model-field"]}
          >
            {/* <InputLabel id="demo-simple-select-helper-label">
                Select Company
              </InputLabel> */}
            <TextField
              select
              fullWidth
              label="Select"
              {...register("company_name", {
                required: "Please enter currency",
              })}
            >
              <>
                {allCompanyData.map(({ name, _id }) => {
                  return (
                    <>
                      <MenuItem key={_id} value={name}>
                        {name}
                      </MenuItem>
                    </>
                  );
                })}
              </>
            </TextField>
            <TextField
              id="outlined-basic"
              label="bill_no"
              variant="outlined"
              {...register("bill_no")}
            />
            <TextField
              id="outlined-basic"
              label="total"
              variant="outlined"
              {...register("total")}
            />
            <TextField
              id="outlined-basic"
              label="take"
              variant="outlined"
              {...register("take")}
            />
            <TextField
              id="outlined-basic"
              label="give"
              variant="outlined"
              {...register("give")}
            />
            <TextField
              id="outlined-basic"
              label="prize type"
              variant="outlined"
              {...register("prize_type")}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label="start date" {...register("start_date")} />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label="Expiry date" {...register("expiry_date")} />
              </DemoContainer>
            </LocalizationProvider>
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
