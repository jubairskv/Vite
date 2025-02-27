import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import getIcon from "../../Utils/IconHelper";
import { useNavigate } from "react-router-dom";

const MobileDropdown = ({ moduleData, selectedModule, handleModuleClick }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isModuleDropdownOpen, setIsModuleDropdownOpen] = useState(false);

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
    <div className="text-black  flex flex-col font-roboto mt-12  ">
      <motion.button
        className="bg-color-gray w-[186px] h-10 ml-1  p-2  rounded-md flex items-center justify-between text-[13px] font-bold "
        onClick={toggleModuleDropdown}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center mb-2 gap-2 ml-2 ">
          <span className="w-6 h-4">{getIcon(selectedModule)}</span>
          <span className="mt-2">
            {t(selectedModule?.toLowerCase() || "Select Module")}
          </span>
        </div>
      </motion.button>

      <div className="pb-2 border-b border-gray-400 shadow-lg rounded-lg">
        <motion.div
          className="overflow-hidden  bg-transparent mt-1 w-[195px] rounded-md "
          initial={{ maxHeight: 0, opacity: 0 }}
          animate={{
            maxHeight: isModuleDropdownOpen ? "200px" : "0",
            opacity: isModuleDropdownOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {moduleData?.map((moduleItems) => (
            <div key={moduleItems?.module_id} className="w-full d">
              <motion.button
                className={`p-1 w-44 m-2 rounded-md text-[12px] flex items-center  ${
                  selectedModule === moduleItems?.module_name
                    ? "bg-color-purple text-black"
                    : ""
                }`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() =>
                  handleModuleSelection(
                    moduleItems?.module_name,
                    moduleItems?.module_id
                  )
                }
              >
                <div className="flex items-center gap-2">
                  <span>{getIcon(moduleItems?.module_name)}</span>
                  <span>{t(moduleItems?.module_name.toLowerCase())}</span>
                </div>
              </motion.button>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MobileDropdown;
