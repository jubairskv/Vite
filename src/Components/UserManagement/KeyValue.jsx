import React from "react";

// Utility function to capitalize the first letter of each word
const capitalizeWords = (string) => {
  return string
    ?.split(/[\s_]/) // Split by spaces or underscores
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    ?.join(" "); // Join the words back together with a space
};

// Reusable KeyValuePairs component
const KeyValuePairs = ({ data, excludeKeys = [] }) => {
  return (
    <div className="p-4">
      {Object.entries(data)
        .filter(([key]) => !excludeKeys.includes(key))
        .map(([key, value]) => (
          <div
            key={key}
            className="flex justify-between p-1 "
          >
            <strong className="w-1/3 text-left font-roboto text-md">
              {capitalizeWords(key.replace(/_/g, " "))}:
            </strong>
            <span className="w-2/3 text-right font-roboto text-md">
              {value || "N/A"}
            </span>
          </div>
        ))}
    </div>
  );
};

export default KeyValuePairs;
