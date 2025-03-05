import React, { useState } from "react";
import { CUSTOMERS_VIEW } from "../../../Utils/Constant";
import CustomersList from "./CustomerList";
import { useDispatch, useSelector } from "react-redux";
import { setCustomers } from "../../../Redux/InstaEnrollSlice";
import useFetchData from "../../../Hooks/InstaEnroll/useFetchCustomer";
import ShimmerTable from "../../../Hooks/InstaEnroll/useShimmerTable";
import { useTranslation } from "react-i18next";
import Error from "../Settingss/Error";

const Customers = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const selectedMenu = useSelector((store) => store.menu.selectedMenuItem);
  const [customersView, setCustomersView] = useState([]);

  const {
    loading,
    error,
    page,
    pageSize,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    updatePageSize,
    goToPage,
  } = useFetchData(
    CUSTOMERS_VIEW,
    (data) => {
      setCustomersView(data?.body || []);
      dispatch(setCustomers(data?.body || []));
    },
    (data) => data?.body || []
  );

  const paginationProps = {
    currentPage: page,
    pageSize,
    totalPages,
    onNextPage: goToNextPage,
    onPreviousPage: goToPreviousPage,
    onPageSizeChange: updatePageSize,
    onPageChange: goToPage,
  };

  return (
    <div className="p-6 flex flex-col font-roboto">
      {!error && (
        <div className="flex justify-between items-center">
          <div className="font-bold text-lg flex">
            {t(`${selectedMenu?.menu_name.toLowerCase()}`)}
          </div>
        </div>
      )}

      {loading ? (
        <ShimmerTable />
      ) : (
        <>
          {error ? (
            <Error message={error} />
          ) : (
            <CustomersList
              customers={customersView}
              paginationProps={paginationProps}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Customers;