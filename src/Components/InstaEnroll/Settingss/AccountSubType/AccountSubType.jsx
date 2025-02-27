import React, { useState, useEffect } from "react";
import { ACCOUNT_SUB_TYPE_VIEW } from "../../../../Utils/Constant";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AccountSubList from "./AccounSubList";
import { useDispatch } from "react-redux";
import { setAccSubType } from "../../../../Redux/InstaEnrollSlice";
import useFetchData from "../../../../Hooks/InstaEnroll/useFetchData";
import { useSelector } from "react-redux";
import ShimmerTable from "../../../../Hooks/InstaEnroll/useShimmerTable";
import { useTranslation } from "react-i18next";
import Error from "../Error";

const AccountSubType = () => {
  const [accountSubView, setAccountSubView] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const selectedMenu = useSelector((store) => store.menu.selectedMenuItem);
  const actions = useSelector((store) => store.instaEnroll.globalActions);
  const Add = actions.some((action) => action.action_name === "Add");

  const { loading, error } = useFetchData(
    ACCOUNT_SUB_TYPE_VIEW,
    (data) => {
      setAccountSubView(data?.account_subtype_array || []);
      dispatch(setAccSubType(data?.account_subtype_array || []));
    },
    setAccountSubView
  );

  const handleNavigation = (path) => {
    navigate(`/body/${path}`);
  };

  return (
    <div className="p-6 flex flex-col font-roboto">
      {!error && (
        <div className="flex justify-between items-center">
          <div className="font-roboto font-bold text-lg flex">
            {t(`${selectedMenu?.menu_name.toLowerCase()}`)}
          </div>
          {Add && ( // Render the Add button only if "Add" action is present
            <button
              className="bg-blue-500 hover:bg-blue-600 flex items-center p-2 text-nowrap rounded text-color-white w-20 h-10"
              onClick={() => handleNavigation("addaccountsubtype")}
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
            <AccountSubList accountSub={accountSubView} />
          )}
        </>
      )}
    </div>
  );
};

export default AccountSubType;
