import axios from "axios";
import { useContext } from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookies } from "./Cookies";


const loginCtx = createContext();
export const AuthProvider = (props) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  //------------------------ FOR LOGIN USER ------------------------//
  const handleCheckLoginPage = async (props) => {
    await axios
      .get(
        `${process.env.REACT_APP_URL}users/check-login`,

        {
          withCredentials: false,
        }
      )
      .then((item) => {
        if (item.data.status) {
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
          setAuth(true)
          setCookies("access_token", item.data.data.accessToken);
          navigate("/company");
        } else {
        }
      });
  };

  return (
    <loginCtx.Provider value={{ auth, setAuth, handleLogin, handleCheckLoginPage }}>
      {props.children}
    </loginCtx.Provider>
  );
  // return { handleLogin, handleCheckLoginPage };
};

export const useLogin = () => useContext(loginCtx);
