import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setSelectedMenuItem } from "../../Redux/SelectedMenu";
import { setTriggerSubMenu } from "../../Redux/UserSlice";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import getImage from "../../Utils/getImage";
import { v4 as uuidv4 } from "uuid";

const MobileItem = ({
  item,
  menuItems,
  activeSubMenu,
  handleSubMenuToggle,
  navigate,
  isCollapsed,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [activeSubMenuItem, setActiveSubMenuItem] = useState(null);

  const handleNavigation = (menuName, fullMenuData) => {
    dispatch(setSelectedMenuItem(fullMenuData));
    const path = menuName?.replace(/\s+/g, "").toLowerCase();
    navigate(`/body/${path}/${uuidv4()}`);
  };

  const handleTriggerSubMenu = (subMenu) => {
    dispatch(setTriggerSubMenu(subMenu));
  };

  const isActive = activeSubMenu === item?.menu_id;

  return (
    <div>
      <motion.button
        className={`p-2 mb-1 mt-1 ml-1 w-[180px]  rounded-md flex items-center gap-2 font-medium text-[12px] hover:bg-gray-200 ${
          isActive
            ? "bg-color-purple text-black"
            : "text-black"
        }`}
        onClick={() => {
          handleSubMenuToggle(item?.menu_id);
          if (item?.menu_name !== "Settings") {
            handleNavigation(item?.menu_name, item);
          }
          handleTriggerSubMenu(item);
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center gap-2">
          {getImage(item.menu_name) && (
            <img
              src={getImage(item.menu_name)}
              alt={item.menu_name}
              className="w-5 h-5"
            />
          )}
          <span className=" truncate">{t(item?.menu_name.toLowerCase())}</span>
        </div>
        {!isCollapsed &&
          menuItems.some((sub) => sub?.parent_menu_id === item?.menu_id) && (
            <span className="ml-auto">
              {isActive ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          )}
      </motion.button>

      <motion.div
        className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
          isActive ? "max-h-96" : "max-h-0"
        }`}
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isActive ? 1 : 0,
          height: isActive ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {!isCollapsed && (
          <div className="mt-1 max-h-60 overflow-y-scroll scrollbar  scrollbar-thumb-[#c5cff4] scrollbar-thumb-rounded-full scrollbar-w-1">
            <div className=" mx-1 rounded-md  outline-none">
              {menuItems
                ?.filter((sub) => sub?.parent_menu_id === item?.menu_id)
                ?.map((subItem) => (
                  <motion.button
                    key={subItem?.menu_id}
                    className={`ml-2 w-[90%] rounded-md p-2   flex items-center text-[12px] mt-2 ${
                      activeSubMenuItem === subItem?.menu_id
                        ? "bg-color-purple text-black"
                        : "text-black"
                    } `}
                    onClick={() => {
                      handleNavigation(subItem?.menu_name, subItem);
                      setActiveSubMenuItem(subItem?.menu_id);
                    }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {getImage(subItem?.menu_name) && (
                      <img
                        src={getImage(subItem?.menu_name)}
                        alt={subItem?.menu_name}
                        className="m-1 w-4 h-4"
                      />
                    )}
                    <span>{t(subItem?.menu_name.toLowerCase())}</span>
                  </motion.button>
                ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MobileItem;
