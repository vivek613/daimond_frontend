import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setCookies } from "./Cookies";

export const useLogin = (props) => {
  const navigate = useNavigate();
  const handleLogin = async (props) => {
    console.log(props);
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
        console.log(item);
        setCookies("access_token", item.data.data, 7);
        navigate("/table");
      });
  };

  return { handleLogin };
};
