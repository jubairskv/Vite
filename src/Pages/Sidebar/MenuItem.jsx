import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMenuItem } from "../../Redux/SelectedMenu";
import { setTriggerSubMenu } from "../../Redux/UserSlice";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import getImage from "../../Utils/getImage";
import { setGlobalActions } from "../../Redux/InstaEnrollSlice";
import useFetchData from "../../Hooks/InstaEnroll/useFetchData";
import { v4 as uuidv4 } from "uuid";
import { setSettingsMenuItems } from "../../Redux/RiskManagement";

const MenuItem = ({
  item,
  menuItems,
  activeSubMenu,
  handleSubMenuToggle,
  navigate,
  isCollapsed,
}) => {
  console.log("Menu Item:", item);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [activeSubMenuItem, setActiveSubMenuItem] = useState(null);
  // const { loading, error, data, fetchData } = useFetchData();

  // const data = item?.actions?.map((action) => ({
  //   action_name: action?.action_name,
  //   action_id: action?.action_id,
  // }));
  // console.log(data)
  // dispatch(setGlobalActions(data));

  const isCollapse = useSelector((store) => store.user.isCollapse);

  const handleNavigation = (menuName, fullMenuData) => {
    console.log(fullMenuData.menu_id);
    dispatch(setSelectedMenuItem(fullMenuData));
    //fetchData(fullMenuData.menu_id);
    const path = menuName?.replace(/\s+/g, "").toLowerCase();
    navigate(`/body/${path}/${uuidv4()}`);
  };

  const handleTriggerSubMenu = (subMenu) => {
    dispatch(setTriggerSubMenu(subMenu));
    console.log(menuItems);
  };

  const isActive = activeSubMenu === item?.menu_id;

  return (
    <div className="text-black font-normal gap-2 mt-2  flex flex-col  font-roboto ">
      <motion.button
        className={`  p-2 text-nowrap mx-4 rounded-md h-9 flex items-center hover:bg-color-gray-200 text-black  truncate font-bold pl-4 text-sm outline-none  ${
          isCollapse ? "w-16 " : "max-w-56 justify-between"
        } ${isActive ? "bg-[#cdd5fd] text-black" : ""} group`}
        onClick={() => {
          handleSubMenuToggle(item?.menu_id);
          if (item?.menu_name !== "Settings") {
            handleNavigation(item?.menu_name, item);
          }
          handleTriggerSubMenu(item);
          dispatch(setGlobalActions(item?.actions));
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div
          className={`flex items-center gap-4 font-roboto font-medium ${
            isCollapse ? "pl-1 " : " pl-3 "
          } `}
        >
          {getImage(item.menu_name) && (
            <img
              src={getImage(item.menu_name)}
              alt={item.menu_name}
              className="w-6 h-6"
            />
          )}
          <span
            className={`pl-2 transition-opacity duration-300 ${
              isCollapse ? "opacity-0" : "opacity-100"
            }`}
          >
            {t(`${item?.menu_name?.toLowerCase()}`)}
          </span>
        </div>

        {!isCollapsed &&
          menuItems.some((sub) => sub?.parent_menu_id === item?.menu_id) && (
            <span>{isActive ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
          )}
      </motion.button>

      <motion.div
        className={`overflow-hidden transition-[max-height] duration-500 ease-in-out   ${
          isActive ? "max-h-96" : "min-h-0"
        }`}
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isActive ? 1 : 0,
          height: isActive ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {!isCollapsed && (
          <div className=" max-h-60 overflow-y-auto overflow-x-hidden scrollbar  scrollbar-thumb-[#C5CFF4]  scrollbar-thumb-rounded-full  font-roboto bg-transparent mx-4 rounded-md scrollbar-w-1">
            <div
              className={` ${
                isCollapse
                  ? "min-w-20 overflow-visible"
                  : "ml-3 max-w-56 justify-between"
              } `}
            >
              {menuItems
                ?.filter((sub) => sub?.parent_menu_id === item?.menu_id)
                ?.map((subItem) => {
                  console.log("Sub Item:", subItem);
   dispatch(setSettingsMenuItems(subItem))
   console.log('dispatchedddddddddddddddddddddddddddd');
   
    return (
      <motion.button
        key={subItem?.menu_id}
        className={`text-nowrap text-[13px] rounded-md mt-2 h-9 ml-4 flex items-center justify-start outline-none ${
          activeSubMenuItem === subItem?.menu_id
            ? "bg-[#cdd5fd]"
            : "text-black hover:bg-gray-300"
        } group ${isCollapse ? "w-[45%]" : "w-[85%] justify-between"}`}
                      onClick={() => {
                        console.log("Clicked Sub Item:", subItem); // Log subItem on click
                        handleNavigation(subItem?.menu_name, subItem);
                        setActiveSubMenuItem(subItem?.menu_id);
                        dispatch(setGlobalActions(subItem?.actions));
                      }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center gap-1 font-roboto outline-none">
                        {getImage(subItem?.menu_name) && (
                          <img
                            src={getImage(subItem?.menu_name)}
                            alt={subItem?.menu_name}
                            className="m-2 w-5 h-5"
                          />
                        )}
                        <span
                          className={`transition-opacity duration-300 ${
                            isCollapse ? "opacity-0" : "opacity-100"
                          }`}
                        >
                          {t(`${subItem?.menu_name.toLowerCase()}`)}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}

            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MenuItem;