import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useRefreshToken from "./useRefreshToken";

const useFetchData = (apiUrl, dispatchFunc, setDataFunc) => {
  const token = useSelector((store) => store.token.token);
 
  const deviceId = useSelector((store) => store.token.deviceId);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Using the refreshToken function from the custom hook
  const refreshToken = useRefreshToken();

  const fetchData = async () => {
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
      });

      const data = await response.json();
      console.log(data);

      // Check for status code 5 (token expired) and call refreshToken
      if (data.status_code === 5 || data.code === 5) {
        console.log("Token expired. Attempting to refresh...");
        const refreshSuccess = await refreshToken();
        console.log(refreshSuccess);

        if (refreshSuccess) {
          // Retry the fetch after the token has been refreshed
          fetchData();
          return; // Exit the current execution
        } else {
          throw new Error("Token refresh failed. Please log in again.");
        }
      }

      // Check for failure based on code 0 or status code
      if (!response.ok || data.code === 0) {
        throw new Error(data?.message || "An error occurred");
      }

      setDataFunc(data);
      dispatchFunc(data);
      setSuccessMessage(data.message || "Operation successful!");
    } catch (err) {
      setError(err.message || "Failed To Fetch Service Unavailable");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiUrl, token, deviceId]); // This effect will run again if apiUrl, token, or deviceId changes

  return { loading, error, successMessage };
};

export default useFetchData;
