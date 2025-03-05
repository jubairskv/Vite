import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useRefreshToken from "../InstaEnroll/useRefreshToken"; // Assuming the custom hook for refreshToken
import { setToken } from "../../Redux/AuthToken"; // Assuming you have an action to update the token

const useAddProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [response, setResponse] = useState(null);

  const token = useSelector((store) => store.token.token);
  const deviceId = useSelector((store) => store.token.deviceId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refreshToken = useRefreshToken();

  const addProfile = async (profilePayload, apiUrl, redirectPath) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

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

      // Handle token expiration and retry
      if (responseData.status_code === 5 || responseData.code === 5) {
        console.log("Token expired. Attempting to refresh...");
        const refreshSuccess = await refreshToken(dispatch);

        if (refreshSuccess) {
          // Retry the original request after token refresh
          return addProfile(profilePayload, apiUrl);
        } else {
          throw new Error("Token refresh failed. Please log in again.");
        }
      }

      if (!response.ok || responseData.code === 0) {
        throw new Error(
          responseData.message || `Error: ${response.statusText}`
        );
      }

      setSuccess(responseData.message || "Add is successful!");
      setResponse(responseData);
      setTimeout(() => navigate(redirectPath), 50);
    } catch (err) {
      setError(err.message || "Failed to add profile.");
      setTimeout(() => navigate(redirectPath), 50);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
    } else if (error) {
      toast.error(error);
    }
  }, [success, error]);

  return {
    addProfile,
    loading,
    error,
    response,
  };
};

export default useAddProfile;
