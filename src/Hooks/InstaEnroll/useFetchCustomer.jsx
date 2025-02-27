import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useRefreshToken from "./useRefreshToken";

const useFetchData = (
  apiUrl,
  dispatchFunc,
  setDataFunc,
  initialPage = 1,
  initialPageSize = 10
) => {
  const token = useSelector((store) => store.token.token);
  const deviceId = useSelector((store) => store.token.deviceId);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalPages, setTotalPages] = useState(null);

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
        body: JSON.stringify({
          page,
          page_size:200
        }),
      });

      const data = await response.json();

      if (data.status_code === 5 || data.code === 5) {
        console.log("Token expired. Attempting to refresh...");
        const refreshSuccess = await refreshToken();

        if (refreshSuccess) {
          fetchData();
          return;
        } else {
          throw new Error("Token refresh failed. Please log in again.");
        }
      }

      if (!response.ok || data.code === 0) {
        throw new Error(data?.message || "An error occurred");
      }

      setDataFunc(data);
      dispatchFunc(data);
      setTotalPages(data.total_pages || 1);
      setSuccessMessage(data.message || "Operation successful!");
    } catch (err) {
      setError(err.message || "Failed To Fetch Service Unavailable");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiUrl, token, deviceId, page, pageSize]);

  const goToNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const updatePageSize = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setPage(page);
    }
  };

  return {
    loading,
    error,
    successMessage,
    page,
    pageSize,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    updatePageSize,
    goToPage,
  };
};

export default useFetchData;