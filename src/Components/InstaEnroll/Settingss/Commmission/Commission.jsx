import React, { useState, useEffect } from "react";
import { COMMISSION_VIEW } from "../../../../Utils/Constant";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CommissionList from "./CommissionList";
import { useDispatch } from "react-redux";
import { setCommssionData } from "../../../../Redux/InstaEnrollSlice";
import useFetchData from "../../../../Hooks/InstaEnroll/useFetchData";
import { useSelector } from "react-redux";
import ShimmerTable from "../../../../Hooks/InstaEnroll/useShimmerTable";
import { useTranslation } from "react-i18next";
import Error from "../Error";

const Commission = () => {
  const [commissionView, setCommissionView] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const selectedMenu = useSelector((store) => store.menu.selectedMenuItem);
  const actions = useSelector((store) => store.instaEnroll.globalActions);
  const Add = actions.some((action) => action.action_name === "Add");

  const { loading, error } = useFetchData(
    COMMISSION_VIEW,
    (data) => {
      setCommissionView(data?.commission_array || []);
      dispatch(setCommssionData(data?.commission_array || []));
    },
    setCommissionView
  );

  const handleNavigation = (path) => {
    navigate(`/body/${path}`);
  };

  return (
    <div className="p-6 flex flex-col">
      {!error && (
        <div className="flex justify-between items-center">
          <div className="font-bold text-lg flex">
            {t(`${selectedMenu?.menu_name.toLowerCase()}`)}
          </div>

          {Add && ( // Render the Add button only if "Add" action is present
            <button
              className="bg-blue-500 hover:bg-blue-600 flex items-center p-2 text-nowrap rounded text-color-white w-20 h-10"
              onClick={() => handleNavigation("addcommission")}
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
            <CommissionList Commission={commissionView} />
          )}
        </>
      )}
    </div>
  );
};

export default Commission;
