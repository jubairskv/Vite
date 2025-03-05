import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useRefreshToken from "./useRefreshToken"; // Assuming the custom hook for refreshToken
import { setToken } from "../../Redux/AuthToken";

const useEdit = (url) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const token = useSelector((store) => store.token.token);
  const deviceId = useSelector((store) => store.token.deviceId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refreshToken = useRefreshToken();

  const handleEditSubmit = async (payload, successRedirectUrl) => {
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

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

      // Handle token expiration and retry
      if (responseData.status_code === 5 || responseData.code === 5) {
        console.log("Token expired. Attempting to refresh...");
        const refreshSuccess = await refreshToken(dispatch);

        if (refreshSuccess) {
          // Retry the original request after the token has been refreshed
          return handleEditSubmit(payload, successRedirectUrl);
        } else {
          throw new Error("Token refresh failed. Please log in again.");
        }
      }

      if (!response.ok || responseData.code === 0) {
        throw new Error(
          responseData.message || `Error: ${response.statusText}`
        );
      }

      setSuccessMessage(responseData.message || "Operation successful!");
      setTimeout(() => navigate(successRedirectUrl), 50);
    } catch (err) {
      setError(err.message || "Failed to edit");
      setTimeout(() => navigate(successRedirectUrl), 50);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    } else if (error) {
      toast.error(error);
    }
  }, [successMessage, error]);

  return {
    handleEditSubmit,
    isSubmitting,
    error,
    successMessage,
  };
};

export default useEdit;
