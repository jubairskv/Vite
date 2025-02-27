import React, { useState } from "react";
import { LEADS_EPURSE_VIEW } from "../../../Utils/Constant";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import LeadsList from "./LeadsList";
import { useDispatch, useSelector } from "react-redux";
import { setLeadsData } from "../../../Redux/CustomersEpurse";
import ShimmerTable from "../../../Hooks/InstaEnroll/useShimmerTable";
import useFetchDataEpurse from "../../../Hooks/Epurse/useFetchDataEpurse";
import { useTranslation } from "react-i18next";


const Leads = () => {
  const [leadsView, setLeadsView] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const selectedMenu = useSelector((store) => store?.menu?.selectedMenuItem);

  const { loading, error } = useFetchDataEpurse(
    LEADS_EPURSE_VIEW,
    (data) => {
      dispatch(setLeadsData(data?.cust_reg_list || []));
      setLeadsView(data?.cust_reg_list || []);
    }
  );

  const handleNavigation = (path) => {
    navigate(`/body/${path}`);
  };

  return (
    <div className="p-6 flex flex-col">
      {!error && (
        <div className="flex justify-between items-center">
          <div className="font-roboto text-lg font-bold flex">
            {t(`${selectedMenu?.menu_name.toLowerCase()}`)}
          </div>

          <button
            className="bg-gradient-to-br from-[#3d78b6] to-[#20205f] flex items-center p-2 text-nowrap rounded text-color-white w-20 h-10 font-roboto text-md"
            onClick={() => handleNavigation("addCustomers")}
          >
            <FaPlus className="mr-1" />
            {t("add")}
          </button>
        </div>
      )}

      {loading ? (
        <ShimmerTable />
      ) : (
        <>
          {error ? (
            <p className="text-color-red">{error}</p>
          ) : (
            {/* <LeadsList leads={leadsView} /> */}
          )}
        </>
      )}
    </div>
  );
};

export default Leads;
