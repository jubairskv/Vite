import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../Redux/AuthToken";
import { REFRESH_TOEKN_API } from "../../Utils/Constant";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearUserData } from "../../Redux/UserSlice";

const useRefreshToken = () => {
  const deviceId = useSelector((store) => store.token.deviceId);
  const token = useSelector((store) => store.token.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const refreshToken = async () => {
    const storedRefreshToken = localStorage.getItem("refreshToken");
    console.log(storedRefreshToken);

    if (!storedRefreshToken) {
      console.error("No refresh token found");
      dispatch(clearUserData());
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("reduxState");
      navigate("/");
      return false;
    }

    try {
      const response = await fetch(REFRESH_TOEKN_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: storedRefreshToken,
          DeviceID: deviceId,
        },
      });

      const data = await response.json();
      dispatch(clearUserData());
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("reduxState");
      console.log("Refresh Token Response:", data);

      if (response.ok && data.code === 1) {
        dispatch(setToken(data.jwt_token));
        localStorage.setItem("refreshToken", data.refresh_token);
        return true;
      } else {
        console.error("Failed to refresh token:", data);
        dispatch(clearUserData());
        localStorage.removeItem("refreshToken");
        sessionStorage.removeItem("reduxState");
        navigate("/");
        return false;
      }
    } catch (error) {
      console.error("An error occurred while refreshing token:", error);
      navigate("/");
      return false;
    }
  };

  // Check if token is undefined and navigate to logout
  useEffect(() => {
    if (!token) {
      console.error("Token is undefined, navigating to logout");
      navigate("/");
      dispatch(clearUserData());
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("reduxState");
    }
  }, [token, navigate]);

  return refreshToken;
};

export default useRefreshToken;
