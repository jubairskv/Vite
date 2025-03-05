import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useRefreshToken from "./useRefreshToken";
import { useSelector } from "react-redux";

const useDeauthorize = () => {
  const [isDeauthLoading, setIsDeauthLoading] = useState(false);
  const [deauthError, setDeauthError] = useState(null);
  const [deauthSuccessMessage, setDeauthSuccessMessage] = useState(null);

  const token = useSelector((store) => store.token.token);
  const deviceId = useSelector((store) => store.token.deviceId);

  const navigate = useNavigate();

  // Using the refreshToken function from the custom hook
  const refreshToken = useRefreshToken();

  const deauthorize = async (url, payload, navigatePath) => {
    try {
      setIsDeauthLoading(true);
      setDeauthError(null);
      setDeauthSuccessMessage(null);

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

      // Check if the token is expired (e.g., status code 5 or 401)
      if (responseData.status_code === 5 || responseData.code === 5) {
        console.log("Token expired. Attempting to refresh...");
        const refreshSuccess = await refreshToken();

        if (refreshSuccess) {
          // Retry the original request after the token has been refreshed
          return deauthorize(url, payload, navigatePath);
        } else {
          throw new Error("Token refresh failed. Please log in again.");
        }
      }

      if (!response.ok || responseData.code === 0) {
        throw new Error(responseData.message || "Failed to Deauthorize");
      }
      console.log(responseData.message);
      setDeauthSuccessMessage(responseData.message || "Deauth is successful!");
      setTimeout(() => navigate(navigatePath), 50);
    } catch (err) {
      setDeauthError(err.message || "Failed to deauthorize");
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
    deauthError,
    deauthSuccessMessage,
  };
};

export default useDeauthorize;
