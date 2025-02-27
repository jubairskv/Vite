import React, { useEffect, useState } from "react";
import {
  basicAuth,
  createDueDeligence,
  criterialist,
  fetchCriteriaData,
  weightageValidation,
} from "../../Utils/Constant";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InputField } from "./components/InputField";
import { toast } from "react-toastify";

const AddDueDiligence = () => {
  const [menuData, setMenuData] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [criteriaData, setCriteriaData] = useState([]);
  const [itemValues, setItemValues] = useState({});
  const [addWhietage, setAddWhietage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [riskCriteriaId, setRiskCriteriaId] = useState(null);
  const [weightageValidData, setWeightageValidData] = useState({});

  const entityId = useSelector(
    (store) => store?.riskManagement?.selectedEntity
  );
  const selectedcriteriaData = useSelector(
    (state) => state.riskManagement.selectedRiskCriteria
  );
  console.log('selectedcriteriaData', selectedcriteriaData);
  
  const deviceId = useSelector((store) => store.token.deviceId);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCriteriaList();
    fetchValidation();
  }, []);

  useEffect(() => {
    if (selectedMenu) {
      fetchCriteria();
    }
  }, [selectedMenu]);

  useEffect(() => {
    if (selectedcriteriaData && selectedcriteriaData.list && selectedcriteriaData.list.length > 0) {
      setIsEditMode(true);
      
      // Use the risk_criteria object for criteria ID
      if (selectedcriteriaData.risk_criteria) {
        setRiskCriteriaId(selectedcriteriaData.risk_criteria.risk_criteria_id);
      } else {
        // Fallback to the first item's criteria_id if risk_criteria isn't available
        setRiskCriteriaId(selectedcriteriaData.list[0].criteria_id);
      }
      
      // Use master_criteria object for menu ID if available
      if (selectedcriteriaData.master_criteria) {
        setSelectedMenu(selectedcriteriaData.master_criteria.criteria_id.toString());
      } else {
        // Fallback to master_criteria_id from list item
        setSelectedMenu(selectedcriteriaData.list[0].master_criteria_id.toString());
      }
      
      // Get the criteria value from risk_criteria if available, otherwise use from first list item
      const criteriaValue = selectedcriteriaData.risk_criteria?.criteria_value || 
                           selectedcriteriaData.list[0].risk_criteria_value;
      setAddWhietage(criteriaValue?.toString() || "");

      // Map field_name to sub_criteria_value from list items
      const initialValues = {};
      selectedcriteriaData.list.forEach((item) => {
        initialValues[item.field_name] = parseFloat(item.sub_criteria_value);
      });
      setItemValues(initialValues);
    } else {
      setIsEditMode(false);
    }
  }, [selectedcriteriaData]);

  const fetchCriteriaList = async () => {
    try {
      const response = await fetch(criterialist, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: basicAuth,
          DeviceID: deviceId,
        },
        body: JSON.stringify({ active_only: true, criteria_existence : true, entity_id : Number(entityId) }),
      });
      const result = await response.json();
      setMenuData(result?.list || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMenuData([]);
    }
  };

  const fetchCriteria = async () => {
    try {
      const response = await fetch(fetchCriteriaData, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: basicAuth,
          DeviceID: deviceId,
        },
        body: JSON.stringify({
          entity_id: Number(selectedMenu),
          active_only: true,
        }),
      });
      const data = await response.json();
      setCriteriaData(data?.list || []);

      if (!selectedcriteriaData?.list?.length) {
        const initialValues = {};
        data?.list?.forEach((item) => {
          initialValues[getItemKey(item)] = 0;
        });
        setItemValues(initialValues);
      }
    } catch (error) {
      console.error("Error while fetching criteria Data:", error);
      setCriteriaData([]);
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
      setWeightageValidData(data.data || {});
    } catch (error) {
      console.error("Error fetching weightage data:", error);
      setWeightageValidData({});
    }
  };

  const getItemKey = (item) => {
    switch (Number(selectedMenu)) {
      case 1:
        return item?.business_name;
      case 2:
        return item?.category_name;
      case 3:
        return item?.gender_name;
      case 4:
        return item?.disability_name;
      case 5:
        return item?.occupation_name;
      case 6:
        return item?.pep_option_name;
      case 7:
        return item?.qualification_name;
      case 8:
        return item?.religion_name;
      case 9:
        return item?.source_name;
      default:
        return "";
    }
  };

  const getDisplayName = (item) => {
    return getItemKey(item) || "Unnamed Item";
  };

  const handleIncrement = (key) => {
    setItemValues((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));
  };

  const handleDecrement = (key) => {
    setItemValues((prev) => ({
      ...prev,
      [key]: Math.max(0, (prev[key] || 0) - 1),
    }));
  };

  const handleValueChange = (key, value) => {
    const numValue = value === "" ? 0 : Math.max(0, parseInt(value) || 0);
    setItemValues((prev) => ({
      ...prev,
      [key]: numValue,
    }));
  };

  const validateForm = () => {
    if (!selectedMenu) {
      toast.error("Please select a criteria type");
      return false;
    }

    if (!addWhietage || isNaN(addWhietage) || addWhietage <= 0) {
      toast.error("Please enter a valid weightage");
      return false;
    }
    const hasValues = Object.values(itemValues).some((value) => value > 0);
    if (!hasValues) {
      toast.error("Please enter at least one criteria value");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const riskSubCriteria = criteriaData
        ?.map((item) => {
          const key = getItemKey(item);
          const value = itemValues[key];

          if (value && value > 0) {
            return {
              field_id: Number(item.id),
              criteria_value: parseFloat(value).toFixed(1),
            };
          }
          return null;
        })
        .filter((item) => item !== null);

      const basePayload = {
        master_criteria_id: Number(selectedMenu),
        criteria_value: parseFloat(addWhietage || 0).toFixed(1),
        entity_id: Number(entityId),
        risk_sub_criteria: riskSubCriteria,
      };

      // Conditionally add risk_criteria_id to the payload
      if (isEditMode && riskCriteriaId) {
        basePayload.risk_criteria_id = riskCriteriaId;
      }

      const response = await fetch(createDueDeligence,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: basicAuth,
            DeviceID: deviceId,
          },
          body: JSON.stringify(basePayload),
        }
      );

      const result = await response.json();
      if (result?.status === "Success") {
        navigate("/body/dueDeligence");
        toast.success(
          result.message ||
            `Successfully ${isEditMode ? "updated" : "created"} criteria`
        );
      } else {
        toast.error(result.messgae || "Operation failed");
        console.error("Error in operation:", result);
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error("An error occurred while processing your request");
    }
  };

  const handleWeightageChange = (value) => {
    let numValue = value === "" ? 0 : parseFloat(value) || 0;
    // Get current value from risk_criteria object if available, otherwise from first list item
    let selectedCurrentValue = selectedcriteriaData?.risk_criteria?.criteria_value || 
                              selectedcriteriaData?.list?.[0]?.risk_criteria_value || 0;

    if (
      (isEditMode &&
        numValue > selectedCurrentValue + weightageValidData.balance_value) ||
      (!isEditMode && numValue > weightageValidData.balance_value)
    ) {
      toast.error("Weightage trying to enter is exceed balance value.");
      return;
    }
    setAddWhietage(numValue);
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Add Due Diligence
      </h2>

      <div className="mb-6">
        <label
          htmlFor="criteriaSelect"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select Criteria Type
        </label>
        <select
          id="criteriaSelect"
          value={selectedMenu}
          onChange={(e) => setSelectedMenu(e.target.value || "")}
          className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-sm"
          disabled={isEditMode}
        >
          <option value="">-- Select criteria --</option>
          {menuData?.map((item) => (
            <option key={item?.criteria_id} value={item?.criteria_id}>
              {item?.criteria_name}
            </option>
          ))}
        </select>
      </div>

      {criteriaData?.length > 0 && (
        <div>
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Criteria Values
            </h3>
            <div className="flex justify-end">
              <InputField
                name="addWhietage"
                label="Weightage"
                onChange={(e) => handleWeightageChange(e.target.value)}
                placeholder="Enter weightage"
                value={addWhietage}
                width="w-full sm:w-64 md:w-72 lg:w-80"
              />
            </div>
          </div>

          <div className="space-y-4">
            {criteriaData?.map((item, index) => {
              const key = getItemKey(item);
              const value = itemValues[key] || 0;

              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded border border-gray-200"
                >
                  <span className="text-sm font-medium text-gray-900">
                    {getDisplayName(item)}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDecrement(key)}
                      className="p-2 bg-white border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="0"
                      value={value}
                      onChange={(e) => handleValueChange(key, e.target.value)}
                      className="w-20 p-2 text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      aria-label={`Value for ${getDisplayName(item)}`}
                    />
                    <button
                      onClick={() => handleIncrement(key)}
                      className="p-2 bg-white border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-start gap-3 mt-4">
            <button
              onClick={handleSubmit}
              className="p-3 px-8 text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
            <button
              onClick={() => navigate("/body/dueDeligence")}
              className="p-3 px-8 text-gray-700 rounded-lg bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDueDiligence;
