import React from "react";
import { useTranslation } from "react-i18next";

const DateRangeFilter = ({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  className = "",
}) => {
  const { t } = useTranslation();

  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      <div className="flex flex-col w-full sm:w-1/2 lg:w-32">
        <label className="text-sm font-medium text-gray-700">{t("StartDate")}</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => onFromDateChange(e.target.value)}
          className="border rounded p-2 text-sm w-full"
        />
      </div>
      <div className="flex flex-col w-full sm:w-1/2 lg:w-32">
        <label className="text-sm font-medium text-gray-700">{t("EndDate")}</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => onToDateChange(e.target.value)}
          className="border rounded p-2 text-sm w-full"
        />
      </div>
    </div>
  );
};

export default DateRangeFilter;
