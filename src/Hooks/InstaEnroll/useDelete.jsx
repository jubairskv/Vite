import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useRefreshToken from "./useRefreshToken"; // Assuming the custom hook for refreshToken

const useDelete = (deleteUrl, deleteAuthUrl) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const token = useSelector((store) => store.token.token);
  const deviceId = useSelector((store) => store.token.deviceId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refreshToken = useRefreshToken();

  const handleDelete = async (
    payload,
    userId,
    selectedAccount,
    successRedirectUrl
  ) => {
    setIsDeleting(true);
    setError(null);
    setSuccessMessage(null);
    try {
      // Decide which API to call based on the condition
      const API_URL =
        selectedAccount.process_status === 4 &&
        !userId.includes(selectedAccount.auth_userid)
          ? deleteAuthUrl
          : deleteUrl;

      const response = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          DeviceID: deviceId,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      // Handle token expiration and retry
      if (data.status_code === 5 || data.code === 5) {
        console.log("Token expired. Attempting to refresh...");
        const refreshSuccess = await refreshToken(dispatch);

        if (refreshSuccess) {
          // Retry the original request after the token has been refreshed
          return handleDelete(
            payload,
            userId,
            selectedAccount,
            successRedirectUrl
          );
        } else {
          throw new Error("Token refresh failed. Please log in again.");
        }
      }

      if (!response.ok || data.code === 0) {
        throw new Error(data.message || "Failed to delete");
      }

      setSuccessMessage(data.message || "Deletion successful!");
      console.log(`Navigating to: ${successRedirectUrl}`); // Log navigation
      setTimeout(() => navigate(successRedirectUrl), 50);
    } catch (err) {
      setError(err.message || "Failed to delete");
      console.log(`Error occurred. Navigating to: ${successRedirectUrl}`); // Log navigation on error
      setTimeout(() => navigate(successRedirectUrl), 50);
    } finally {
      setIsDeleting(false);
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
    handleDelete,
    isDeleting,
    error,
    successMessage,
  };
};

export default useDelete;
