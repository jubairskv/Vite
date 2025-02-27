import React, { useState, useEffect, useRef } from "react";
import {
  MdPerson,
  MdMessage,
  MdHelpOutline,
  MdSettings,
  MdLock,
  MdLogout,
} from "react-icons/md";
import Instalogo from "../../Assets/InstaEnroll.svg";
import EpurseLogo from "../../Assets/ePurse.svg";
import UserLogo from "../../Assets/InstaUser.svg";
import { useDispatch, useSelector } from "react-redux";
import { setIsCollapse } from "../../Redux/UserSlice";
import { useTranslation } from "react-i18next";
import Globe from "../../Assets/global.svg";
import Avatar from "../../Assets/Avatar-Male1.svg"
import { useNavigate } from "react-router-dom";
import { clearUserData } from "../../Redux/UserSlice";
import { clearUserDataAuth } from "../../Redux/AuthToken";
import { clearUserDataInsta } from "../../Redux/InstaEnrollSlice";
import { clearUserDataUserManagement } from "../../Redux/UserManagement";
import MenuBar from "../../Assets/ToggleMenu.svg";
import flag from "../../Assets/flag.png";
import USFlag from "../../Assets/English.png";
import Arab from "../../Assets/Arab.png";
import france from "../../Assets/france.png";

const Header = ({ loginData }) => {
  const { i18n } = useTranslation();
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const isCollapse = useSelector((store) => store.user.isCollapse);
  const navigate = useNavigate();

  const [selectedLanguage, setSelectedLanguage] = useState({
    name: "English",
    flag: USFlag,
    code: "en",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false); // Added state

  const userID = loginData.map((item) => item.user_id);
  const userType = loginData.map((item) => item.user_type);

  const SelectModuleIcon = useSelector(
    (store) => store.menu.selectedModuleIcon
  );

  console.log(SelectModuleIcon);

  // Function to toggle the user dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Function to toggle the language dropdown
  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen((prev) => !prev);
  };

  // Function to toggle sidebar collapse state
  const toggleSidebar = () => {
    dispatch(setIsCollapse(!isCollapse)); // Dispatch action to toggle collapse state
  };

  // Single useEffect for handling resize and outside clicks
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && !isCollapse) {
        dispatch(setIsCollapse(true)); // Collapse sidebar on smaller screens
      }

      if (window.innerWidth >= 768 && isCollapse) {
        dispatch(setIsCollapse(false)); // Expand sidebar on larger screens
      }
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false); // Close language dropdown
        setIsDropdownOpen(false); // Close user dropdown
      }
    };

    // Attach event listeners
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCollapse, dispatch]);

  const handleLogout = () => {
    dispatch(clearUserData());
    dispatch(clearUserDataAuth());
    dispatch(clearUserDataInsta());
    dispatch(clearUserDataUserManagement());
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("reduxState");
    navigate("/");
  };

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
    setIsLanguageDropdownOpen(false);
  };

  return (
    <div className="flex xl-flex justify-center    items-center w-full xl:w-full h-16 bg-[#f1f1f5]  border-l-2 shadow-md">
      <button
        onClick={toggleSidebar}
        className=" ml-4 p-2 rounded hover:bg-body-color text-color-light-blue outline-none hidden md:block"
      >
        {isCollapse ? (
          <img
            src={MenuBar}
            alt="menu"
            className="w-7 h-7 bg-blue-500 rounded p-1"
          />
        ) : (
          <img
            src={MenuBar}
            alt="menu"
            className="w-7 h-7 bg-blue-500 rounded p-1"
          />
        )}
      </button>
      <div className="flex flex-1 ml-3 items-center">
        <img
          src={
            SelectModuleIcon === "InstaEnroll"
              ? Instalogo
              : SelectModuleIcon === "ePurse"
              ? EpurseLogo
              :  SelectModuleIcon === "User"
              ? UserLogo
              : null
          }
          alt="Module Logo"
          className="hidden md:block md:w-26 md:h-26 lg:block xl:block w-28 h-28"
        />
      </div>

      <div className="font-roboto flex gap-1 sm:gap-4 md:gap-6 lg:gap-6 mr-8 relative">
        {/* Language Dropdown */}
        <div className="relative">
          <div
            className="w-8 h-8 md:w-8 md:h-8 rounded-full flex justify-center items-center cursor-pointer"
            onClick={toggleLanguageDropdown} // Use the correct toggle function
          >
            <img
              src={Globe}
              alt="globe"
              className="h-8 w-8 rounded-full"
            />
          </div>
          {isLanguageDropdownOpen && ( // Use the correct state for visibility
            <div
              ref={dropdownRef}
              className="absolute mt-1 bg-white shadow-lg rounded-md border w-32 z-50 right-0"
            >
              <ul className="py-2">
                {languages.map((lang) => (
                  <li
                    key={lang.code}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
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

        {/* User Icon with Dropdown */}
        <div className="relative">
          <div
            className="w-8 h-8 md:w-8 md:h-8 rounded-full border-gray-500 border flex justify-center items-center cursor-pointer"
            onClick={toggleDropdown}
          >
            <img
              src={Avatar}
              alt="globe"
              className="h-8 w-8 rounded-full"
            />
          
          </div>

          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-lg z-50"
            >
              <div className="p-4 border-b">
                <p className="font-semibold text-gray-800">user Name</p>
                <p className="text-sm text-gray-500">user.test@email.com</p>
              </div>
              <ul className="p-2">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <MdPerson className="mr-2 text-gray-600" /> Profile
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <MdMessage className="mr-2 text-gray-600" /> Messages
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <MdHelpOutline className="mr-2 text-gray-600" /> Help
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <MdSettings className="mr-2 text-gray-600" /> Settings{" "}
                  <span className="text-sm ml-2 px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    New
                  </span>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <MdLock className="mr-2 text-gray-600" /> Lock Screen
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <button onClick={handleLogout} className="flex items-center">
                    <MdLogout className="mr-2 text-gray-600" /> Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
