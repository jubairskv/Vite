import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useRefreshToken from "./useRefreshToken"; // Assuming the custom hook for refreshToken
import { setToken } from "../../Redux/AuthToken"; // Assuming you have an action to update the token

const useAdd = (apiEndpoint, redirectPath) => {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const token = useSelector((store) => store.token.token);
  const deviceId = useSelector((store) => store.token.deviceId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Using the refreshToken function from the custom hook
  const refreshToken = useRefreshToken();

  const handleAddSubmit = async (payload) => {
    setIsSubmitting(true);
    setSuccessMessage(null);
    setError(null);

    try {
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

      // If token is expired (e.g., code 5 or 401 status), attempt to refresh the token
      if (responseData.status_code === 5 || responseData.code === 5) {
        console.log("Token expired. Attempting to refresh...");
        const refreshSuccess = await refreshToken(dispatch);

        if (refreshSuccess) {
          // Retry the original request after the token has been refreshed
          return handleAddSubmit(payload); // Recursively call handleAddSubmit
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
      setTimeout(() => navigate(redirectPath), 50);
    } catch (err) {
      setError(err.message || "Failed to add");
      setTimeout(() => navigate(redirectPath), 50);
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

  return { handleAddSubmit, isSubmitting, error, successMessage };
};

export default useAdd;
