/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import "./Login.css";
import { useLogin } from "../../Hooks";
import { useNavigate } from "react-router";
import Loader from "../../Components/Loader/Loader";

export const Login = () => {
  const { handleLogin, loginButtonLoading } = useLogin();
  const navigate = useNavigate();
  const { register, handleSubmit, control, errors } = useForm({
    defaultValues: {
      email: "admin@gmail.com",
      password: "admin@123",
    },
  });
  const onSubmit = (data) => handleLogin(data);
  const token = sessionStorage.getItem("access_token");
  React.useEffect(() => {
    token && navigate("/company");
  }, [token]);

  return (
    <>
      <div className="dp-login-container">
        <div className="dp-login-page-fields-block">
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{ m: 1, bgcolor: "secondary.main" }}
                style={{ background: "#715d83cc" }}
              >
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  label="Email Address"
                  {...register("email")}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  label="Password"
                  type="password"
                  {...register("password")}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{ background: "#715d83cc" }}
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loginButtonLoading}
                >
                  {loginButtonLoading ? (
                    <Loader style={{ marginTop: "-30px", height: "48px" }} />
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </Box>
          </Container>
        </div>
      </div>
    </>
  );
};
