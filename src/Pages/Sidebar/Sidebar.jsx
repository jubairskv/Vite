import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalActions } from "../../Redux/InstaEnrollSlice";
import { clearUserData } from "../../Redux/UserSlice";
import ModuleDropdown from "./ModuleDropdown";
import MenuList from "./MenuList";
import { motion } from "framer-motion";
import { setSelectedModuleIcon } from "../../Redux/SelectedMenu";
import MobileDropdown from "./MobileSidebar";
import { RiMenuUnfold3Fill, RiMenuUnfold4Fill } from "react-icons/ri";
import MobileList from "./MobileList";
import useFetchData from "../../Hooks/InstaEnroll/useFetchData";
import useFetchModules from "../../Hooks/InstaEnroll/useFetchModuleData";
import { setFilteredModules } from "../../Redux/UserSlice";
import {
  CUSTOMER_TYPE_VIEW,
  ACCOUNT_TYEP_VIEW,
  ACCOUNT_SUB_TYPE_VIEW,
} from "../../Utils/Constant";
import { setCusTypeData, setAccSubType } from "../../Redux/InstaEnrollSlice";
import { setAccTypeData } from "../../Redux/UserSlice";
import LogoutButton from "./LogoutButton";
import { FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const [selectedModule, setSelectedModule] = useState("Modules");
  const [menuItems, setMenuItems] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dataAcc, setDataAcc] = useState([]);
  const [dataCus, setDataCus] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menu = useSelector((store) => store.userManagements.SidebarMenuItem);
  console.log('menumenu', menu);
  const userData = menu?.menu_array;
  console.log('userDatauserData', userData);
  
  const isCollapse = useSelector((store) => store.user.isCollapse);

  

  // Custom hook for module API call
  const { moduleData } = useFetchModules();

  useEffect(() => {
    if (moduleData?.length > 0 && userData?.length > 0) {
      const globalActions = userData.map((item) =>
        item?.actions?.map((action) => ({
          action_name: action?.action_name,
          action_id: action?.action_id,
        }))
      );
      console.log(globalActions);

      //dispatch(setGlobalActions(globalActions[0]));

      const filteredModules = moduleData.filter((moduleItems) =>
        userData.some(
          (userModule) => userModule?.module_id === moduleItems?.module_id
        )
      );

      dispatch(setFilteredModules(filteredModules));
    }
  }, [moduleData, userData, dispatch]);

  const handleModuleClick = (moduleName, moduleId) => {
    setSelectedModule(moduleName);
    dispatch(setSelectedModuleIcon(moduleName));
    const filteredMenuItems = userData.filter(
      (item) => item?.module_id === moduleId
    );
    setMenuItems(filteredMenuItems);
    console.log(moduleName);
  };

  useFetchData(
    CUSTOMER_TYPE_VIEW,
    (data) => {
      setDataCus(data?.cust_array || []);
      dispatch(setCusTypeData(data?.cust_array || []));
    },
    setDataCus
  );

  useFetchData(
    ACCOUNT_TYEP_VIEW,
    (data) => {
      setDataAcc(data?.account_type_array || []);
      dispatch(setAccTypeData(data?.account_type_array || []));
    },
    setDataAcc
  );

  useFetchData(
    ACCOUNT_SUB_TYPE_VIEW,
    (data) => {
      setDataAcc(data?.account_subtype_array || []);
      dispatch(setAccSubType(data?.account_subtype_array || []));
    },
    setDataAcc
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    dispatch(clearUserData());
    localStorage.removeItem("reduxState");
    sessionStorage.removeItem("reduxState");
    navigate("/");
  };

  return (
    <div className="relative">
      <button
        onClick={toggleSidebar}
        className={`absolute top-2 mb-2 left-4 z-50 bg-[#f1f1f5] text-black p-2 rounded-md shadow-md md:hidden ${
          isSidebarOpen ? "hidden" : ""
        }`}
      >
        {isSidebarOpen ? (
          <RiMenuUnfold4Fill size={19} />
        ) : (
          <RiMenuUnfold3Fill size={19} />
        )}
      </button>
      {/* Sidebar for Large Screens */}
      <motion.div
        className={`h-screen bg-[#f1f1f5] border-r-2 justify-between shadow-sm flex-col transition-all duration-300 relative hidden md:flex ${
          isCollapse ? "w-[90px]" : "w-[235px]"
        }`}
        initial={{ width: "0px" }}
        animate={{ width: isCollapse ? "100px" : "235px" }}
        exit={{ width: "0px" }}
        transition={{ duration: 0.3 }}
      >
        <div className="overflow-y-auto overflow-x-hidden relative scrollbar  border-t rounded-md border-gray-300 scrollbar-thumb-[#92A0AD] scrollbar-thumb-rounded-full scrollbar-w-1 ">
          <ModuleDropdown
            moduleData={moduleData}
            selectedModule={selectedModule}
            handleModuleClick={handleModuleClick}
            isCollapse={isCollapse}
          />
          <MenuList
            menuItems={menuItems}
            navigate={navigate}
            isCollapse={isCollapse}
          />
        </div>
        <div className="m-3 ">
          {isCollapse ? (
            <button
              onClick={handleLogout}
              className="flex items-center ml-4 gap-2 border bg-blue-100  text-color-black font-roboto font-bold py-1 px-3 rounded  transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-400 focus:outline-none shadow-md mb-3"
            >
              <FiLogOut className="xl:text-2xl lg:text-lg md:text-md" />
            </button>
          ) : (
            <LogoutButton handleLogout={handleLogout} />
          )}
        </div>
      </motion.div>
      {/* Mobile Sidebar */}
      <motion.div
        className={`absolute top-0 left-0 h-screen overflow-y-auto overflow-x-hidden  scrollbar  scrollbar-thumb-[#92A0AD] scrollbar-thumb-rounded-full scrollbar-w-1 bg-[#f1f1f5] flex flex-col justify-between shadow-lg z-40 transition-transform duration-300 md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        initial={{ x: "-100%" }}
        animate={{ x: isSidebarOpen ? "0%" : "-100%" }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3 }}
        style={{ width: "220px" }}
      >
        <button
          onClick={toggleSidebar}
          className={`  ${
            isSidebarOpen
              ? "absolute top-2 mb-2 left-4 z-50 bg-[#f1f1f5] text-black p-2 rounded-md shadow-md"
              : "hidden"
          }`}
        >
          <RiMenuUnfold3Fill size={19} />
        </button>
        <div className="overflow-visible   top-4 mr-2 ml-2">
          <MobileDropdown
            moduleData={moduleData}
            selectedModule={selectedModule}
            handleModuleClick={handleModuleClick}
            isCollapse={false}
            isMobileView={true}
          />
          <MobileList menuItems={menuItems} navigate={navigate} />
        </div>
        <div>
          <LogoutButton handleLogout={handleLogout} />
        </div>
      </motion.div>
      {isSidebarOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
