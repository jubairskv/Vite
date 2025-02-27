import React, { useState, useEffect, useRef } from "react";
import flag from "../Assets/flag.png";
import USFlag from "../Assets/English.png";
import Arab from "../Assets/Arab.png";
import france from "../Assets/france.png";
import { useTranslation } from "react-i18next";
import { BiSolidDownArrow } from "react-icons/bi"

const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState({
    name: "English",
    flag: USFlag,
    code: "en",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { name: "Indian", flag: flag, code: "hi" },
    { name: "English", flag: USFlag, code: "en" },
    { name: "French", flag: france, code: "fr" },
    { name: "Arabic", flag: Arab, code: "ar" },
  ];

  const handleSelect = (language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language.code);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center space-x-2 cursor-pointer px-3 py-2 rounded-md "
        onClick={toggleDropdown}
      >
        <img
          src={selectedLanguage.flag}
          alt="Selected Flag"
          className="w-6 h-6"
        />
        <span className="font-medium">{selectedLanguage.name}</span>
        <BiSolidDownArrow className="w-4 h-4 text-gray-600" />
      </div>

      {isDropdownOpen && (
        <div className="absolute mt-1 bg-white shadow-lg rounded-md border w-32">
          <ul className="py-2">
            {languages.map((lang) => (
              <li
                key={lang.code}
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer "
                onClick={() => handleSelect(lang)}
              >
                <img
                  src={lang.flag}
                  alt={`${lang.name} Flag`}
                  className="w-5 h-5 mr-3"
                />
                <span>{lang.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
