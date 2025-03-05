import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { VscFilter } from "react-icons/vsc";

const DropdownFilter = ({ selectedValue, onFilterChange }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const filterOptions = [
    { value: "", label: t("All") },
    { value: "AUTH WAIT", label: t("Auth Wait") },
    { value: "AUTHORIZED", label: t("Authorized") },
    { value: "DEAUTH", label: t("Deauth") },
    { value: "DEL_WAIT_AUTH", label: t("Del Wait Auth") },
    { value: "Complete", label: t("Complete") },
    { value: "Incomplete", label: t("Incomplete") },
  ];

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionSelect = (value) => {
    onFilterChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative mt-5 mr-5">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center p-2  text-gray-700"
      >
        <VscFilter className="text-xl w-7 h-7 " />
      </button>

      {isOpen && (
        <div className="absolute lg:-left-36 -right-36 mt-2 bg-color-white w-36 border rounded shadow-md z-50">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleOptionSelect(option.value)}
              className="w-full text-left p-2 hover:bg-color-dim-gray flex justify-start"
            >
              <span className="flex-1">{option.label}</span>{" "}
              {/* Left-align label */}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;
