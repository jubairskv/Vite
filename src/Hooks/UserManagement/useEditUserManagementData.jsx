import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import useRefreshToken from "../InstaEnroll/useRefreshToken";

const useEditProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  const token = useSelector((store) => store.token.token);
  const deviceId = useSelector((store) => store.token.deviceId);
  const dispatch = useDispatch();
  const refreshToken = useRefreshToken();

  const editProfile = async (profilePayload, apiUrl, successRedirectUrl) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          DeviceID: deviceId,
        },
        body: JSON.stringify(profilePayload),
      });

      const responseData = await response.json();

      // Handle token expiration
      if (responseData.status_code === 5 || responseData.code === 5) {
        console.log("Token expired. Attempting to refresh...");
        const refreshSuccess = await refreshToken(dispatch);

        if (refreshSuccess) {
          // Retry the edit request after refreshing the token
          return editProfile(profilePayload, apiUrl, successRedirectUrl);
        } else {
          throw new Error("Token refresh failed. Please log in again.");
        }
      }

      if (!response.ok || responseData.code === 0) {
        throw new Error(responseData.message || "Failed to edit profile");
      }

      setResponse(responseData);
      setSuccessMessage(responseData.message || "Edit is successful!");
      setTimeout(() => navigate(successRedirectUrl), 50);
    } catch (err) {
      setError(err.message || "Failed to edit");
      setTimeout(() => navigate(successRedirectUrl), 50);
    } finally {
      setLoading(false);
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
    editProfile,
    loading,
    error,
    response,
  };
};

export default useEditProfile;
