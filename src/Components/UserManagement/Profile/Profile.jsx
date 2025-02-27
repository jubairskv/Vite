import React, { useState } from "react";
import { PROFILE_VIEW } from "../../../Utils/Constant";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ProfileList from "./ProfileList";
import { useDispatch, useSelector } from "react-redux";
import { setAccTypeData, setListProfile } from "../../../Redux/UserSlice";
import ShimmerTable from "../../../Hooks/InstaEnroll/useShimmerTable";
import useFetchData from "../../../Hooks/UserManagement/useFetchUserManagementData";
import { useTranslation } from "react-i18next";
import Error from "../../InstaEnroll/Settingss/Error";

const Profile = () => {
  const [profileView, setProfileView] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const selectedMenu = useSelector((store) => store?.menu?.selectedMenuItem);
  const actions = useSelector((store) => store.instaEnroll.globalActions);
  const Add = actions.some((action) => action.action_name === "Add");

  const { loading, error } = useFetchData(PROFILE_VIEW, (data) => {
    dispatch(setAccTypeData(data?.profile_array || []));
    setProfileView(data?.profile_array || []);
    dispatch(setListProfile(data || []));
  });

  const handleNavigation = (path) => {
    navigate(`/body${path}`);
  };

  return (
    <div className="p-6 flex flex-col ">
      {!error && (
        <div className="flex justify-between items-center">
          <div className="font-roboto text-lg font-bold flex">
            {t(`${selectedMenu?.menu_name.toLowerCase()}`)}
          </div>

          {Add && ( // Render the Add button only if "Add" action is present
            <button
              className="bg-blue-500 flex items-center p-2 text-nowrap rounded text-color-white w-20 h-10 hover:bg-blue-600"
              onClick={() => handleNavigation("/addprofile")}
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
        <>
          {error ? (
            <Error message={error} />
          ) : (
            <ProfileList profile={profileView} />
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
