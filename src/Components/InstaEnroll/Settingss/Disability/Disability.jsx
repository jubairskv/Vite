import React, { useState, useEffect } from "react";
import { DISABILITY_VIEW } from "../../../../Utils/Constant";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DisabilityList from "./DisabilityList";
import { useDispatch } from "react-redux";
import { setDisability } from "../../../../Redux/InstaEnrollSlice";
import { useSelector } from "react-redux";
import useFetchData from "../../../../Hooks/InstaEnroll/useFetchData";
import ShimmerTable from "../../../../Hooks/InstaEnroll/useShimmerTable";
import { useTranslation } from "react-i18next";
import Error from "../Error";

const Disability = () => {
  const [disabilityView, setDisabilityView] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const selectedMenu = useSelector((store) => store?.menu?.selectedMenuItem);
  const actions = useSelector((store) => store.instaEnroll.globalActions);
  const Add = actions.some((action) => action.action_name === "Add");

  const { loading, error } = useFetchData(
    DISABILITY_VIEW,
    (data) => {
      setDisabilityView(data?.disability_array || []);
      dispatch(setDisability(data?.disability_array || []));
    },
    setDisabilityView
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
              onClick={() => handleNavigation("adddisability")}
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
            <DisabilityList disability={disabilityView} />
          )}
        </>
      )}
    </div>
  );
};

export default Disability;
