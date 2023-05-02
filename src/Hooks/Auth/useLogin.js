import React from "react";
import axios from "axios";
import { useContext } from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookies, setSession } from "./Cookies";
import { toast } from "react-hot-toast";

const loginCtx = createContext();
export const AuthProvider = (props) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loaginCheckLoading, setLoaginCheckLoading] = useState(false);

  //------------------------ FOR LOGIN USER ------------------------//
  const handleCheckLoginPage = async (props) => {
    setLoaginCheckLoading(true);
    await axios
      .get(
        `${process.env.REACT_APP_URL}users/check-login`,
        {},
        {
          withCredentials: false,
        }
      )
      .then((item) => {
        if (item.data.status) {
          setLoaginCheckLoading(false);
          navigate("/login");
        } else {
        }
      });
  };

  //------------------------ FOR LOGIN USER ------------------------//
  const handleLogin = async (props) => {
    await axios
      .post(
        `${process.env.REACT_APP_URL}users/login`,
        {
          email: props.email,
          password: props.password,
        },
        {
          withCredentials: false,
        }
      )
      .then((item) => {
        if (item.status) {
          setAuth(true);
          toast.success(" Login Successfully !");

          // setCookies("access_token", item.data.data.accessToken);
          sessionStorage.setItem("access_token", item.data.data.accessToken);
          navigate("/company");
        } else {
        }
      });
  };

  return (
    <loginCtx.Provider
      value={{ auth, setAuth, loading, setLoading, loaginCheckLoading, handleLogin, handleCheckLoginPage }}
    >
      {props.children}
    </loginCtx.Provider>
  );
};

export const useLogin = () => useContext(loginCtx);
