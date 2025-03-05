import React, { useState } from "react";
import { USER_VIEW } from "../../../Utils/Constant";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserList from "./UserList";
import useFetchData from "../../../Hooks/UserManagement/useFetchUserManagementData";
import { useDispatch, useSelector } from "react-redux";
import { setUserSelectedItem } from "../../../Redux/UserManagement";
import ShimmerTable from "../../../Hooks/InstaEnroll/useShimmerTable";
import { useTranslation } from "react-i18next";
import Error from "../../InstaEnroll/Settingss/Error";

const User = () => {
  const [userView, setUserView] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const selectedMenu = useSelector((store) => store.menu.selectedMenuItem);
  const actions = useSelector((store) => store.instaEnroll.globalActions);
  const Add = actions.some((action) => action.action_name === "Add");

  const payload = {
    inst_id: 1,
  };

  const { loading, error } = useFetchData(
    USER_VIEW,
    (data) => {
      dispatch(setUserSelectedItem(data?.profile_array || []));
      setUserView(data?.profile_array || []);
    },
    payload
  );

  const handleNavigation = (path) => {
    navigate(`/body/${path}`);
  };

  return (
    <div className="p-6 flex flex-col font-roboto">
      {!error && (
        <div className="flex justify-between items-center">
          <div className="font-bold text-lg flex font-roboto">
            {t(`menu_name_${selectedMenu?.menu_name?.toLowerCase()}`)}
          </div>

          {Add && ( // Render the Add button only if "Add" action is present
            <button
              className="bg-blue-500 hover:bg-blue-600 flex items-center p-2 text-nowrap rounded text-color-white w-20 h-10"
              onClick={() => handleNavigation("adduser")}
            >
              <FaPlus className="mr-1" />
              {t("add")}
            </button>
          )}
        </div>
      )}

      {loading ? (
        <ShimmerTable />
      ) : (
        <>{error ? <Error message={error} /> : <UserList user={userView} />}</>
      )}
    </div>
  );
};

export default User;
