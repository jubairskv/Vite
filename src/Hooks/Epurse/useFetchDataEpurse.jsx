import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useFetchDataEpurse = (apiUrl, handleData, payload) => {
  const token = useSelector((store) => store.token.token);
  const deviceId = useSelector((store) => store.token.deviceId);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


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

      if (!response.ok || data.status_code === 5 || data.code === 0) {
        throw new Error(data?.message || "An error occurred");
      }

      handleData(data);

      // // Only set success message if status code is not 5
      // if (data.status_code === 5) {
      //   setSuccessMessage(data?.message || "Data fetched successfully"); // Default success message
      // }
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

export default useFetchDataEpurse;
