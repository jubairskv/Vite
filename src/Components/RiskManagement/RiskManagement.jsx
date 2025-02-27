import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  basicAuth,
  createRiskScore,
  customer_type,
  getRiskLevel,
  riskLevels,
} from "../../Utils/Constant";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedEntity } from "../../Redux/RiskManagement";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const RiskManagement = () => {
  const navigate = useNavigate();
  const [showColorPicker, setShowColorPicker] = useState(null);
  const colorPickerRefs = useRef({});
  const [custTypeData, setCustTypeData] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [riskLevelsValues, setRiskLevelsValues] = useState([]);
  const [riskData, setRiskData] = useState([]);
  const deviceId = useSelector((store) => store.token.deviceId);
  const [ranges, setRanges] = useState({});
  const dispatch = useDispatch();
  const headers = {
    "Content-Type": "application/json",
    Authorization: basicAuth,
    DeviceID: deviceId,
  };

  useEffect(() => {
    fetchCustomerTypeList();
    fetchRiskLevels();
  }, []);

  useEffect(() => {
    if (selectedMenu) {
      getRiskData();
    }
  }, [selectedMenu]);

  useEffect(() => {
    if (riskLevelsValues?.length > 0) {
      const initialRanges = {};

      if (riskData?.length > 0) {
        riskData.forEach((riskLevel) => {
          const matchingLevel = riskLevelsValues?.find(
            (level) => level?.master_level_id === riskLevel?.risk_master_level
          );

          if (matchingLevel) {
            initialRanges[matchingLevel.level_name] = {
              min: parseFloat(riskLevel.min_value),
              max: parseFloat(riskLevel.max_value),
              enabled: riskLevel.status,
              color: riskLevel.color_code,
              master_level_id: riskLevel.risk_master_level,
              risk_level_id: riskLevel.risk_level_id,
            };
          }
        });
      } else {
        let previousMax = -1;

        riskLevelsValues.forEach((level, index) => {
          const min = previousMax + 1;
          const rangeSize = Math.floor(100 / riskLevelsValues.length);
          let max = min + rangeSize - 1;

          if (index === riskLevelsValues.length - 1) {
            max = 100;
          } else {
            max = Math.min(max, 99);
          }

          initialRanges[level.level_name] = {
            min,
            max,
            enabled: level.status,
            color: getDefaultColor(level.level_name.toLowerCase()),
            master_level_id: level.master_level_id,
            risk_level_id: null,
          };

          previousMax = max;
        });
      }

      setRanges(initialRanges);
    }
  }, [riskLevelsValues, riskData]);

  const getDefaultColor = (levelName) => {
    const colors = {
      low: "#4CAF50",
      medium: "#FFC107",
      high: "#FF5722",
      prohibited: "#F44336",
    };
    return colors[levelName] || "#808080";
  };

  const handleColorPickerClick = (range) => {
    if (colorPickerRefs.current[range]) {
      colorPickerRefs.current[range].click();
    }
  };

  const handleClickOutside = (e, range) => {
    if (
      colorPickerRefs.current[range] &&
      !colorPickerRefs.current[range].contains(e.target)
    ) {
      setShowColorPicker(null);
    }
  };

  useEffect(() => {
    if (showColorPicker) {
      document.addEventListener("mousedown", (e) =>
        handleClickOutside(e, showColorPicker)
      );
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showColorPicker]);

  const handleToggle = (range) => {
    const updatedRanges = { ...ranges };
    updatedRanges[range].enabled = !updatedRanges[range].enabled;
    setRanges(updatedRanges);
    calculateRanges(updatedRanges);
  };

  const handleSliderChange = (range, values) => {
    const updatedRanges = { ...ranges };
    updatedRanges[range].min = values[0];
    updatedRanges[range].max = values[1];

    setRanges(updatedRanges);
    calculateRanges(updatedRanges);
  };

  const handleColorChange = (range, newColor) => {
    const updatedRanges = { ...ranges };
    updatedRanges[range].color = newColor;
    setRanges(updatedRanges);
  };

  const calculateRanges = (updatedRanges, changedRange) => {
    const rangesArray = Object.entries(updatedRanges);
    const enabledRanges = rangesArray.filter(([_, range]) => range.enabled);
    let found100 = false;

    if (enabledRanges.length > 0 && enabledRanges.filter(([key, range]) => range.min === 0 && range.max === 100).length >= 2) {
      enabledRanges.forEach(([key, range]) => {
        if (range.min !== 0 || range.max !== 100) {
          range.min = 0;
          range.max = 0;
        }
      });
    } else {
      let previousMax = -1;

      enabledRanges.forEach(([key, range], index) => {
        if (found100) {
          range.min = 0;
          range.max = 0;
        } else {
          if (previousMax === -1) {
            range.min = 0;
          } else {
            range.min = previousMax + 1;
          }
          range.max = Math.max(range.min, range.max);

          if (range.max === 100) {
            found100 = true;
          }
        }
        previousMax = range.max;

        if (index === enabledRanges.length - 1 && !found100) {
          range.max = 100;
        }
      });

      rangesArray.forEach(([key, range]) => {
        if (!range.enabled) {
          range.min = null;
          range.max = null;
        }
      });
    }

    setRanges({ ...updatedRanges });
  };

  const handleCustomerType = (e) => {
    const { value } = e.target;
    setSelectedMenu(value);
    dispatch(setSelectedEntity(value));
  };

  const fetchCustomerTypeList = async () => {
    try {
      const response = await fetch(customer_type, {
        method: "POST",
        headers,
        body: JSON.stringify({ active_only: true }),
      });
      const result = await response.json();
      setCustTypeData(result?.list);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getRiskData = async () => {
    try {
      const response = await fetch(getRiskLevel, {
        method: "POST",
        headers,
        body: JSON.stringify({
          // active_only: true,
          entity_id: Number(selectedMenu),
        }),
      });
      const data = await response.json();
      setRiskData(data?.list || []);
    } catch (error) {
      console.error("Error fetching risk data:", error);
      toast.error("Failed to fetch risk data");
    }
  };

  const fetchRiskLevels = async () => {
    try {
      const response = await fetch(riskLevels, {
        method: "POST",
        headers,
        body: JSON.stringify({ Activeonly: true }),
      });
      const data = await response.json();
      setRiskLevelsValues(data?.list);
    } catch (error) {
      console.log("error while fetching riskLevels");
    }
  };

  const handleSubmit = async () => {
    if (!selectedMenu) {
      toast.error("Please select a customer type.");
      return;
    }
    try {
      const payload = {
        risk_levels: Object.entries(ranges).map(([level_name, range]) => ({
          risk_master_level: range.master_level_id,
          entity_id: Number(selectedMenu),
          min_value: range.enabled
            ? parseFloat(range.min).toFixed(2)
            : "0.00", // Set to "0.00" if disabled
          max_value: range.enabled
            ? parseFloat(range.max).toFixed(2)
            : "0.00", // Set to "0.00" if disabled
          status: range.enabled ? true : false, // Send status based on enabled state
          color_code: range.color,
          level_name: level_name.toLowerCase(),
          ...(range.risk_level_id && { risk_level_id: range.risk_level_id }),
        })),
      };

      const result = await fetch(createRiskScore, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });
      await result.json();
      if (result.ok) {
        navigate("/body/dueDeligence");
      } else {
        toast.error("Failed to create Risk Scores");
      }
    } catch (error) {
      console.log("Error creating riskScore", error);
      toast.error("Failed to create Risk Scores");
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 ">
      <div className="container mx-auto px-4" style={{ maxWidth: '100%', padding: '1rem' }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Risk Assessment</h1>
          <div className="w-full md:w-80">
            <label
              htmlFor="customerType"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Customer Type
            </label>
            <select
              id="customerType"
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              onChange={handleCustomerType}
            >
              <option value="">Select Customer Type</option>
              {custTypeData?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.type_name}
                </option>
              )) ?? <option disabled>No customer types available</option>}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 w-full">
          <div className="space-y-6" style={{ overflow: 'auto', maxWidth: '100%' }}>
            {Object.entries(ranges).map(([key, range]) => (
              <div key={key} className="relative" style={{ minWidth: '300px' }}>
                <div
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    range.enabled
                      ? "bg-gray-50 hover:bg-gray-100"
                      : "bg-gray-100 opacity-75"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="relative">
                          <div
                            onClick={() => handleColorPickerClick(key)}
                            className="w-8 h-8 rounded-lg shadow-md cursor-pointer transform transition-transform hover:scale-110"
                            style={{ backgroundColor: range.color }}
                          />
                          <input
                            ref={(el) => (colorPickerRefs.current[key] = el)}
                            type="color"
                            value={range.color}
                            onChange={(e) =>
                              handleColorChange(key, e.target.value)
                            }
                            className="absolute opacity-0 w-8 h-8 cursor-pointer"
                            style={{ top: 0, left: 0 }}
                          />
                        </div>
                        <span className="text-lg font-semibold text-gray-800">
                          {key}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {range.min != null && range.max != null
                            ? `${range.min} - ${range.max}`
                            : "Disabled"}
                        </span>
                      </div>

                      <div className="relative pt-1 w-full">
                        <Slider
                          range
                          min={0}
                          max={100}
                          value={[range.min, range.max]}
                          onChange={(values) => handleSliderChange(key, values)}
                          disabled={!range.enabled}
                          railStyle={{
                            backgroundColor: "#d1d5db",
                            height: 6,
                            borderRadius: 3,
                          }}
                          trackStyle={{
                            backgroundColor: range.color,
                            height: 6,
                            borderRadius: 3,
                          }}
                          handleStyle={{
                            borderColor: range.color,
                            height: 16,
                            width: 16,
                            marginTop: -5,
                            backgroundColor: "#fff",
                            boxShadow:
                              "0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06)",
                          }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggle(key)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 flex items-center ${
                        range.enabled
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                      }`}
                    >
                      {range.enabled ? "Disable" : "Enable"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
  <button
    onClick={() => navigate(-1)}
    className="inline-flex items-center px-5 py-2.5 rounded-md text-gray-600 bg-gray-100 hover:bg-gray-200 border border-gray-200 shadow-sm transition-all duration-200 font-medium text-sm"
  >
    <span className="mr-1">←</span>
    <span>Back</span>
  </button>
  <button
    onClick={handleSubmit}
    className="inline-flex items-center px-5 py-2.5 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all duration-200 font-medium text-sm transform hover:translate-y-px"
  >
    <span>Proceed</span>
    <span className="ml-1">→</span>
  </button>
</div>
      </div>
    </div>
  );
};

export default RiskManagement;
