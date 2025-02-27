import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import useRefreshToken from "../InstaEnroll/useRefreshToken"; // Assuming you have a custom hook for refreshing tokens
import { setToken } from "../../Redux/AuthToken"; // Redux action to update the token

const useDelete = (deleteUrl, deleteAuthUrl) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const token = useSelector((store) => store.token.token);
  const deviceId = useSelector((store) => store.token.deviceId);
  const dispatch = useDispatch();
  const refreshToken = useRefreshToken();

  const handleDelete = async (
    payload,
    userId,
    selectedUser,
    successRedirectUrl
  ) => {
    setIsDeleting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Determine API URL based on conditions
      const API_URL =
        selectedUser.process_status === 4 &&
        !userId.includes(selectedUser.created_userid)
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

      // Handle token expiration
      if (data.status_code === 5 || data.code === 5) {
        console.log("Token expired. Attempting to refresh...");
        const refreshSuccess = await refreshToken(dispatch);

        if (refreshSuccess) {
          // Retry the delete request after refreshing the token
          return handleDelete(
            payload,
            userId,
            selectedUser,
            successRedirectUrl
          );
        } else {
          throw new Error("Token refresh failed. Please log in again.");
        }
      }

      if (!response.ok || data.code === 0) {
        throw new Error(data.message || "Failed to delete");
      }

      setSuccessMessage(data.message || "Delete is successful!");
      setTimeout(() => navigate(successRedirectUrl), 50);

      return data;
    } catch (error) {
      setError(error.message || "Failed to delete");
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
