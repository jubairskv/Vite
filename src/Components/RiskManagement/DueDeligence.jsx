import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import {
  basicAuth,
  CRITERIA_STATUS_UPDATE,
  DELETE_CRITERIA,
  GET_CRITERIADATA_BYID,
  riskCriteriaList,
  weightageValidation,
} from "../../Utils/Constant";
import {
  setRiskCriteriaRiskCount,
  setSelectedRiskCriteria,
} from "../../Redux/RiskManagement";
import { toast } from "react-toastify";
import ToggleButton from "./components/ToggleButton";

const DueDiligenceUI = () => {
  const deviceId = useSelector((store) => store.token.deviceId);
  const [riskCriteriaData, setRiskCriteriaData] = useState([]);
  const [critriaTotalValueExceed, setCriteriaTotalValueExceed] =
    useState(false);
  const entityId = useSelector(
    (store) => store?.riskManagement?.selectedEntity
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchRiskCriteriaList();
    fetchValidation();
  }, []);

  useEffect(() => {
    const totalCriteriaValue = riskCriteriaData?.reduce(
      (sum, item) => sum + item?.criteria_value,
      0
    );
    setCriteriaTotalValueExceed(totalCriteriaValue === 100);
  }, [riskCriteriaData]);

  const fetchRiskCriteriaList = async () => {
    try {
      const response = await fetch(riskCriteriaList, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: basicAuth,
          DeviceID: deviceId,
        },
        body: JSON.stringify({entity_id : Number(entityId)}),
      });
      const data = await response.json();
      setRiskCriteriaData(data?.list);
      dispatch(setRiskCriteriaRiskCount(data.count));
       // Reset exceed flag to false initially then update based on current value
      if (data?.list?.length > 0) {
         fetchValidation();
      } else {
        setCriteriaTotalValueExceed(false);
      }
    } catch (error) {
      console.log("Error while fetching data", error);
    }
  };

  const getRiskCriteriaDataById = async (riskCriteriaId) => {
    try {
      const response = await fetch(GET_CRITERIADATA_BYID, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: basicAuth,
          DeviceID: deviceId,
        },
        body: JSON.stringify({ entity_id: riskCriteriaId }),
      });
      const data = await response.json();
      dispatch(setSelectedRiskCriteria(data.data));
      navigate("/body/addDueDeligence");
    } catch (error) {
      console.log("error while getting riskCriteria data", error);
    }
  };
  const handleStatusUpdate = async (riskCriteriaId, currentStatus) => {
    // Find the item that's about to be toggled
    const toggledItem = riskCriteriaData.find(
      (item) => item.risk_criteria_id === riskCriteriaId
    );
  
    // If no weightage data, just let it run
    if (!toggledItem) {
      await updateStatus(riskCriteriaId, currentStatus);
      return;
    }
  
    // Calculate the potential new total
    const potentialNewTotal = currentStatus
      ? riskCriteriaData.reduce((sum, item) => {
          if (item.risk_criteria_id === riskCriteriaId) {
            return sum; // Don't add the current item's value if disabling
          }
          return sum + (item.status ? item.criteria_value : 0); // Sum only active items
        }, 0)
      : riskCriteriaData.reduce((sum, item) => {
          if (item.risk_criteria_id === riskCriteriaId) {
            return sum + toggledItem.criteria_value; // Add the toggled item's value if enabling
          }
          return sum + (item.status ? item.criteria_value : 0); // Sum only active items
        }, 0);
  
    if (potentialNewTotal > 100) {
      toast.error(
        "Enabling this would exceed the maximum weightage of 100. Please reduce the weightage to proceed."
      );
      return;
    }
  
    // Proceed to update status if total is valid
    await updateStatus(riskCriteriaId, currentStatus);
  };
  
  // Helper function to update status
  const updateStatus = async (riskCriteriaId, currentStatus) => {
    try {
      const response = await fetch(CRITERIA_STATUS_UPDATE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: basicAuth,
          DeviceID: deviceId,
        },
        body: JSON.stringify({
          risk_criteria_id: riskCriteriaId,
          status: !currentStatus,
        }),
      });
  
      const data = await response.json();
      if (data.status === "Success") {
        toast.success("Status updated successfully!");
  
        setRiskCriteriaData((prevData) =>
          prevData.map((item) =>
            item.risk_criteria_id === riskCriteriaId
              ? { ...item, status: !currentStatus }
              : item
          )
        );
        fetchValidation();
      } else {
        toast.error("Failed to update status.");
      }
    } catch (error) {
      console.error("Error while updating status:", error);
      toast.error("An error occurred while updating status.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(DELETE_CRITERIA, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: basicAuth,
          DeviceID: deviceId,
        },
        body: JSON.stringify({ risk_criteria_id: id }),
      });
      await response.json;
      toast.success("Criteria deleted successfully");
      fetchRiskCriteriaList();
    } catch (error) {
      console.log("error while deleting Criteria", error);
      throw error;
    }
  };

  const fetchValidation = async () => {
    try {
      const response = await fetch(weightageValidation, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: basicAuth,
          DeviceID: deviceId,
        },
        body: JSON.stringify({ entity_id: Number(entityId) }),
      });
      const data = await response.json();
      console.log("data", data);
      if (data.data.current_value === 100) {
        setCriteriaTotalValueExceed(true);
      } else {
          setCriteriaTotalValueExceed(false)
      }
    } catch (error) {
      console.error("Error fetching weightage data:", error);
      setCriteriaTotalValueExceed(false);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen flex flex-col">
      <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
        Due Diligence
      </h2>

      {/* Add button ALWAYS visible, before content */}
      <div className="mb-4 flex justify-center">
        <button
          onClick={() => {
            dispatch(setSelectedRiskCriteria([]));
            navigate("/body/addDueDeligence");
          }}
          disabled={critriaTotalValueExceed}
          className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-2 text-sm ${
            critriaTotalValueExceed ? "opacity-50 cursor-not-allowed" : ""
          }`}
          title={
            critriaTotalValueExceed
              ? "Reduce weightage to create Due Diligence form"
              : ""
          }
        >
          <MdAdd className="h-4 w-4" />
          <span>Add Due Diligence</span>
        </button>
      </div>

      {/* Main content area */}
      <div className="flex-grow">
        {riskCriteriaData?.length > 0 ? (
          <div className="space-y-4">
            {riskCriteriaData.map((row) => (
              <div
                key={row.risk_criteria_id}
                className="bg-white shadow-md rounded-lg p-5 border border-gray-200 hover:border-blue-300 transition-colors duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <ToggleButton
                      isOn={row.status}
                      onToggle={() =>
                        handleStatusUpdate(row.risk_criteria_id, row.status)
                      }
                      label={row.status ? "Active" : "Inactive"}
                    />
                    <span className="text-lg font-semibold text-gray-800">
                      {row.master_criteria_name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600 font-medium">
                        Weightage:
                      </span>
                      <input
                        type="number"
                        value={row.criteria_value}
                        disabled
                        className="w-16 p-2 text-center rounded-md border border-gray-300 focus:ring-blue-300 focus:border-blue-300"
                      />
                      <span className="text-gray-600">%</span>
                    </div>
                    <button
                      onClick={() =>
                        getRiskCriteriaDataById(row.risk_criteria_id)
                      }
                      className="text-blue-500 hover:text-blue-700 transition-colors duration-200 p-2 rounded-md"
                    >
                      <MdEdit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(row.risk_criteria_id)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2 rounded-md"
                    >
                      <MdDelete className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400 mx-auto mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.999 4.999A7 7 0 0119 17.001M19 6a9 9 0 01-9 9M15 13.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="text-gray-500 text-lg">No Due Diligence criteria available.</p>
              <p className="text-gray-500 text-sm mt-1">Add some to get started!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DueDiligenceUI;

