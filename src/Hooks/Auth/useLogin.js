import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setCookies } from "./Cookies";

export const useLogin = (props) => {
  const navigate = useNavigate();

  //------------------------ FOR LOGIN USER ------------------------//
  const handleCheckLoginPage = async (props) => {
    await axios
      .get(
        "http://localhost:5000/api/users/check-login",
        {},
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
        "http://localhost:5000/api/users/login",
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
          setCookies("access_token", item.data.data.accessToken);
          navigate("/company");
        } else {
        }
      });
  };

  return { handleLogin, handleCheckLoginPage };
};
