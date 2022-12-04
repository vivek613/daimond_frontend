import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setCookies } from "./Cookies";

export const useLogin = (props) => {
  const navigate = useNavigate();

  //------------------------ FOR LOGIN USER ------------------------//
  const handleLogin = async (props) => {
    await axios
      .post(
        "http://localhost:4000/api/users/login",
        {
          email: props.email,
          password: props.password,
        },
        {
          withCredentials: false,
        }
      )
      .then((item) => {
        if (item.data.status) {
          setCookies("access_token", item.data.data, 7);
          navigate("/table");
        } else {
        }
      });
  };

  return { handleLogin };
};
