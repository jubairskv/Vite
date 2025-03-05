import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useRefreshToken from "./useRefreshToken";
import { useSelector } from "react-redux";

// Custom hook for handling authorization
const useAuthorize = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [authSuccessMessage, setAuthSuccessMessage] = useState(null);

  const token = useSelector((store) => store.token.token);
  const deviceId = useSelector((store) => store.token.deviceId);

  const navigate = useNavigate();

  // Using the refreshToken function from the custom hook
  const refreshToken = useRefreshToken();

  const authorize = async (apiEndpoint, payload, redirectPath) => {
    try {
      setIsLoading(true);
      setAuthError(null);
      setAuthSuccessMessage(null);

      const response = await fetch(apiEndpoint, {
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
          return authorize(apiEndpoint, payload, redirectPath);
        } else {
          throw new Error("Token refresh failed. Please log in again.");
        }
      }

      if (!response.ok || responseData.code === 0) {
        throw new Error(responseData.message || "Failed to authorize");
      }

      setAuthSuccessMessage(responseData.message || "Auth is successful!");
      setTimeout(() => navigate(redirectPath), 50);
    } catch (err) {
      setAuthError(err.message || "Failed to authorize");
      setTimeout(() => navigate(redirectPath), 50);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authSuccessMessage) {
      toast.success(authSuccessMessage);
    } else if (authError) {
      toast.error(authError);
    }
  }, [authSuccessMessage, authError]);

  return { authorize, isLoading, authError, authSuccessMessage };
};

export default useAuthorize;
