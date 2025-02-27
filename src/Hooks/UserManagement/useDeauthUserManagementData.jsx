import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import useRefreshToken from "../InstaEnroll/useRefreshToken"; // Assuming you have a custom hook for refreshing tokens
import { setToken } from "../../Redux/AuthToken"; // Redux action to update the token

const useDeauthorize = () => {
  const [isDeauthLoading, setIsDeauthLoading] = useState(false);
  const [deauthError, setDeauthError] = useState(null);
  const [deauthSuccessMessage, setDeauthSuccessMessage] = useState(null);

  const navigate = useNavigate();
  const token = useSelector((store) => store.token.token);
  const deviceId = useSelector((store) => store.token.deviceId);
  const dispatch = useDispatch();
  const refreshToken = useRefreshToken();

  const deauthorize = async (url, payload, navigatePath) => {
    setIsDeauthLoading(true);
    setDeauthError(null);
    setDeauthSuccessMessage(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          DeviceID: deviceId,
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      // Handle token expiration
      if (responseData.status_code === 5 || responseData.code === 5) {
        console.log("Token expired. Attempting to refresh...");
        const refreshSuccess = await refreshToken(dispatch);

        if (refreshSuccess) {
          // Retry the deauthorization request after refreshing the token
          return deauthorize(url, payload, navigatePath);
        } else {
          throw new Error("Token refresh failed. Please log in again.");
        }
      }

      if (!response.ok || responseData.code === 0) {
        throw new Error(responseData.message || "Failed to deauthorize");
      }

      setDeauthSuccessMessage(
        responseData.message || "Deauthorization successful!"
      );
      setTimeout(() => navigate(navigatePath), 50);

      return responseData;
    } catch (error) {
      setDeauthError(error.message || "Failed to deauthorize");
      setTimeout(() => navigate(navigatePath), 50);
    } finally {
      setIsDeauthLoading(false);
    }
  };

  useEffect(() => {
    if (deauthSuccessMessage) {
      toast.success(deauthSuccessMessage);
    } else if (deauthError) {
      toast.error(deauthError);
    }
  }, [deauthSuccessMessage, deauthError]);

  return {
    deauthorize,
    isDeauthLoading,
  };
};

export default useDeauthorize;
