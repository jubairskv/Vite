import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { GET_MODULE_API_URL } from "../../Utils/Constant";

const useFetchModules = () => {
  const [moduleData, setModuleData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = useSelector((store) => store?.token?.token);
  const deviceId = useSelector((store) => store.token.deviceId);

  useEffect(() => {
    const fetchModules = async () => {
      setLoading(true);
      try {
        const response = await fetch(GET_MODULE_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            DeviceID: deviceId,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setModuleData(data?.module_info || []);
      } catch (err) {
        console.error("Error fetching module data:", err);
        setError(err.message);
      }
    };

    if (token && deviceId) {
      fetchModules();
    }
  }, [token, deviceId]);

  return { moduleData, error };
};

export default useFetchModules;
