import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import useRefreshToken from "../InstaEnroll/useRefreshToken"; // Assuming you have a custom hook for refreshing tokens
import { setToken } from "../../Redux/AuthToken"; // Redux action to update the token

const useFetchData = (apiUrl, handleData, payload) => {
  const token = useSelector((store) => store.token.token);
  const deviceId = useSelector((store) => store.token.deviceId);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const refreshToken = useRefreshToken();

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
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
          // Retry the fetch after refreshing the token
          return fetchData();
        } else {
          throw new Error("Token refresh failed. Please log in again.");
        }
      }

      if (!response.ok || data.code === 0) {
        throw new Error(data?.message || "An error occurred");
      }

      handleData(data);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiUrl, token, deviceId]);

  return { loading, error };
};

export default useFetchData;
