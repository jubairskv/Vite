import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../Redux/AuthToken";
import { userData } from "../../Redux/UserSlice";
import { API_URL } from "../../Utils/Constant";
import { useSelector } from "react-redux";
import { setSidebarMenuItem } from "../../Redux/UserManagement";

const useLogin = () => {
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((store) => store.token.token);

  const validateForm = (userName, password) => {
    let isValid = true;
    let validationErrors = {};

    if (!userName) {
      validationErrors.userName = "User ID is required";
      isValid = false;
    }

    if (!password) {
      validationErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const loginUser = async ({ userName, password }) => {
    if (!validateForm(userName, password)) return;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "X-Password": "4970FAB298E271E430010235E9C88EA5E467DEEF",
          "X-Username": "wallet",
          Appversion: "4.0.4",
          "Content-Type": "application/json",
          Deviceid: "1234545667676",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_name: userName,
          password,
          user_type: "CORPORATE",
        }),
      });

      const data = await response.json();
      //console.log("loginData", data);
      //console.log(data.token_info.jwt_token);
      //   console.log(data.token_info.refresh_token);

      if (response.ok && data.code === 1) {
        const { jwt_token, refresh_token } = data.token_info;
        console.log("User Data:", jwt_token);

        dispatch(userData(data));
        dispatch(setSidebarMenuItem(data));
        dispatch(setToken(jwt_token));
        localStorage.setItem("refreshToken", refresh_token);
        navigate("/body");
      } else {
        setErrorMessage("Invalid username or password. Please try again.");
        setShowModal(true);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMessage("An error occurred. Please try again later.");
      setShowModal(true);
    }
  };

  return {
    loginUser,
    errors,
    errorMessage,
    showModal,
    setShowModal,
  };
};

export default useLogin;
