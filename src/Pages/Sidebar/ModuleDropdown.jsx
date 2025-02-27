import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import getIcon from "../../Utils/IconHelper";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ModuleDropdown = ({ moduleData, selectedModule, handleModuleClick }) => {
  console.log('moduleData', moduleData);
  
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isModuleDropdownOpen, setIsModuleDropdownOpen] = useState(false);

  const isCollapse = useSelector((store) => store.user.isCollapse);

  const toggleModuleDropdown = () => {
    setIsModuleDropdownOpen(!isModuleDropdownOpen);
  };

  const handleModuleSelection = (moduleName, moduleId) => {
    handleModuleClick(moduleName, moduleId);
    setIsModuleDropdownOpen(false);
    const path = moduleName
      ?.replace(/\s+/g, "")
      .toLowerCase()
      .replace(/^user$/, "usermanagement");
    navigate(`/body/${path}`);
  };

  return (
    <div
      className={`text-black font-normal mt-3  flex flex-col  font-roboto shadow-md border-l border-r rounded-md ${
        isCollapse ? "" : ""
      }`}
    >
      <motion.button
        className={` bg-[#cdd5fd] text-black p-3 text-nowrap mx-4 rounded-md h-9 flex items-center  truncate font-bold pl-4 text-sm outline-none ${
          isCollapse ? " ml-2  min-w-12 " : "max-w-56 justify-between"
        }`}
        onClick={toggleModuleDropdown}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center justify-start gap-6  ">
          <span
            className={`text-black ${
              isCollapse
                ? "ml-3 mt-1 w-6 h-5 mb-2"
                : "flex items-center justify-center w-5 h-5"
            }`}
          >
            {getIcon(selectedModule)}
          </span>

          <span
            className={`transition-opacity duration-300 ${
              isCollapse ? "opacity-0 " : "opacity-100"
            }`}
          >
            {t(`${selectedModule?.toLowerCase() || "Select Module"}`)}
          </span>
        </div>
        <span className={`gap-4 ${isCollapse ? "opacity-0" : "opacity-100"}`}>
          {isModuleDropdownOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </span>
      </motion.button>
      <div className="border-b  shadow-md  rounded-lg ">
        <motion.div
          className={`overflow-hidden bg-transparent my-2 rounded-md mx-4  ${
            isCollapse
              ? "justify-center ml-2  min-w-20 max-h-full"
              : "w-56 max-h-full"
          } `}
          initial={{ maxHeight: 0, opacity: 0 }}
          animate={{
            maxHeight: isModuleDropdownOpen ? "500px" : "0",
            opacity: isModuleDropdownOpen ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {moduleData?.map((moduleItems) => (
            <div
              key={moduleItems?.module_id}
              className=" text-black font-normal gap-4 mt-2 flex flex-col font-roboto"
            >
              <motion.button
                className={`p-4 text-nowrap rounded-md h-9 mx-4 hover:bg-gray-200  flex items-center font-bold outline-none  ${
                  selectedModule === moduleItems?.module_name
                    ? "bg-[#cdd5fd] text-black"
                    : ""
                } ${isCollapse ? "min-w-12 " : "w-[86%] justify-between"}`}
                onClick={() =>
                  handleModuleSelection(
                    moduleItems?.module_name,
                    moduleItems?.module_id
                  )
                }
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="group relative flex items-center gap-6 ">
                  <span
                    className={` text-black ${
                      isCollapse
                        ? "items-center justify-center w-6 h-6"
                        : "w-6 h-6"
                    }`}
                  >
                    {getIcon(moduleItems?.module_name)}
                  </span>
                  {!isCollapse && (
                    <span
                      className={`transition-opacity duration-300 overflow-x-clip ${
                        isCollapse ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      {t(`${moduleItems?.module_name.toLowerCase()}`)}
                    </span>
                  )}
                  {/* {isCollapse && (
                    <span
                      className="absolute text-[10px] font-medium text-color-white bg-blue-900 rounded-md px-1 left-2 
               opacity-0 group-hover:opacity-100 group-hover:-translate-y-4 transition-all 
               duration-300 z-50"
                    >
                      {t(`${moduleItems?.module_name.toLowerCase()}`)}
                    </span>
                  )} */}
                </div>
              </motion.button>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ModuleDropdown;
