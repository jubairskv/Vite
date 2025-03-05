import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import useRefreshToken from "../InstaEnroll/useRefreshToken"; // Assuming you have a custom hook for refreshing tokens

const useAuthorize = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [authSuccessMessage, setAuthSuccessMessage] = useState(null);

  const navigate = useNavigate();
  const token = useSelector((store) => store.token.token);
  const deviceId = useSelector((store) => store.token.deviceId);
  const dispatch = useDispatch();
  const refreshToken = useRefreshToken();

  const authorize = async (apiEndpoint, payload, redirectPath) => {
    try {
      setIsLoading(true);
      setAuthError(null);
      setAuthSuccessMessage(null);

      console.log("Authorize Payload:", payload);

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

      // Handle token expiration
      if (responseData.status_code === 5 || responseData.code === 5) {
        console.log("Token expired. Attempting to refresh...");
        const refreshSuccess = await refreshToken(dispatch);

        if (refreshSuccess) {
          // Retry the authorization after token refresh
          return authorize(apiEndpoint, payload, redirectPath);
        } else {
          throw new Error("Token refresh failed. Please log in again.");
        }
      }

      if (!response.ok || responseData.code === 0) {
        throw new Error(responseData.message || "Failed to authorize");
      }

      setAuthSuccessMessage(
        responseData.message || "Authorization successful!"
      );
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

  return { authorize, isLoading };
};

export default useAuthorize;
