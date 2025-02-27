import React from "react";
import { useTranslation } from "react-i18next";

const KeyValueDisplay = ({ data }) => {
  const { t } = useTranslation();
  console.log(data);

  const capitalizeWords = (string) => {
    return string
      ?.split(/[\s_]/)
      ?.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");
  };

  return (
    <div>
      {Object.entries(data)?.map(([key, value]) => (
        <div key={key} className="flex justify-between p-1">
          <strong className="w-1/3 text-left">{t(key)}:</strong>
          <span className="w-2/3 text-right">
            {typeof value === "boolean" ? value.toString() : value || "N/A"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default KeyValueDisplay;
