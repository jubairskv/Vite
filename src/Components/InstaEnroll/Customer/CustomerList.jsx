import React, { useState } from "react";
import DropdownMenu from "../../UserManagement/User/UserDropdownMenu";
import { useSelector, useDispatch } from "react-redux";
import { setCustomersSelectedItem } from "../../../Redux/InstaEnrollSlice";
import { useNavigate } from "react-router-dom";
import SearchBar from "../Settingss/SearchBar";
import { Pagination } from "antd";
import { useTranslation } from "react-i18next";
import useSortIcon from "../Settingss/useSortIcon";
import DropdownFilter from "../Settingss/DropdownFilter";
import DateRangeFilter from "../Settingss/DateRangeFilter";
import TableList from "../Settingss/Table";

const CustomersList = ({
  customers,
  paginationProps: {
    pageSize,
    totalPages,
    totalItems,
    onNextPage,
    onPreviousPage,
    onPageSizeChange,
  },
}) => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterStatus, setFilterStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handlePageSizeChange = (current, newPageSize) => {
    onPageSizeChange(newPageSize); // Update the page size in the parent component
  };

  const actions = useSelector((store) => store.instaEnroll.globalActions);
  const user = useSelector((store) => store?.user?.items);
  const userId = user?.map((items) => items.user_id);

  let idCounter = 0; // Assuming idCounter is defined somewhere in your code

  const transformCustomerData = (customers) => {
    return customers.map((item) => {
      const accountData = item.accout_satus || {};
      const addressData = item.address_status || {};
      const businessAddressData = item.business_address_status || {};
      const businessDetailsData = item.business_detail_status || {};
      const genkycData = item.genkyc_status || {};
      const guardianData = item.guardian_status || {};
      const modeofopresData = item.mode_of_operation_status || {};
      const occupationData = item.occupation_status || {};
      const pepData = item.pep_status || {};
      const userData = item.user_data || {};

      // Determine the highest status value and its source
      const statusSources = [
        { name: "Account Status", status: accountData.status ?? null },
        { name: "Address Status", status: addressData.status ?? null },
        {
          name: "Business Address Status",
          status: businessAddressData.status ?? null,
        },
        {
          name: "Business Detail Status",
          status: businessDetailsData.status ?? null,
        },
        { name: "Genkyc Status", status: genkycData.status ?? null },
        { name: "Guardian Status", status: guardianData.status ?? null },
        {
          name: "Mode Of Operation Status",
          status: modeofopresData.status ?? null,
        },
        { name: "Occupation Status", status: occupationData.status ?? null },
        { name: "Pep Status", status: pepData.status ?? null },
        { name: "User Status", status: userData.status ?? null },
      ];

      // Check if all status values are null
      const allStatusNull = statusSources.every(
        (source) => source.status === null
      );

      let highestStatusObj;
      let highestStatus;
      let statusName;

      if (allStatusNull) {
        // If all status values are null, set statusName to "N/A"
        highestStatus = "N/A";
        statusName = "N/A";
      } else {
        // Find the object with the highest status
        highestStatusObj = statusSources.reduce((prev, curr) =>
          (curr.status ?? -Infinity) > (prev.status ?? -Infinity) ? curr : prev
        );
        highestStatus = highestStatusObj.status;
        statusName = highestStatusObj.name;
      }

      // Set eKYC based on highestStatus
      const eKYC =
        highestStatus === "N/A" || highestStatus < 30
          ? "INCOMPLETE"
          : "COMPLETE";

      return {
        id: ++idCounter,
        reference: accountData.reference || "N/A",
        status_name: statusName, // Name of the object with the highest status (or "N/A")
        eKYC: eKYC, // Updated eKYC based on highestStatus
        account_type: accountData.acct_type_name || "N/A",
        account_sub_type: accountData.acct_sub_type_name || "N/A",
        first_name: genkycData.first_name || "N/A",
        last_name: genkycData.last_name || "N/A",
        middle_name: genkycData.middle_name || "N/A",
        created_time: accountData.created_time || "N/A",
        originalData: item,
      };
    });
  };

  const transformedCustomers = transformCustomerData(customers);

  const toggleDropdown = (index, customersItem) => {
    setOpenDropdowns({
      [index]: !openDropdowns[index],
    });
  };

  const closeDropdown = (index) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  const openCustomersViewPage = (customersItem, index) => {
    const originalCustomerData = customersItem.originalData;
    dispatch(setCustomersSelectedItem(originalCustomerData));
    closeDropdown(index);
    navigate("/body/viewcustomer");
  };

  const openCustomersAuthPage = (customers, customersItem) => {
    dispatch(setCustomersSelectedItem(customers));
    navigate(`/body/authcustomer/${customersItem.id}`);
  };

  const openCustomerstEditPage = (customers, customersItem) => {
    dispatch(setCustomersSelectedItem(customers));
    navigate(`/body/editcustomer/${customersItem.id}`);
  };

  const openCustomersDeletePage = (customers, customersItem) => {
    dispatch(setCustomersSelectedItem(customers));
    navigate(`/body/deletecustomer/${customersItem.id}`);
  };

  const finalHeaders = transformedCustomers?.find((obj) => {
    return Object.keys(obj).some((key) => key.includes("_edited"));
  });

  const headersToUse = finalHeaders ? finalHeaders : transformedCustomers?.[0];

  const headerKeys = finalHeaders
    ? Object.keys(finalHeaders).filter((key) => key !== "originalData")
    : headersToUse
    ? Object.keys(headersToUse).filter((key) => key !== "originalData")
    : [];

  const sortedAccounts = [...transformedCustomers].sort((a, b) => {
    if (sortColumn) {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  const filteredAgents = sortedAccounts?.filter((customersItem) => {
    const matchesSearchQuery =
      !searchQuery ||
      customersItem?.account_type
        ?.toLowerCase()
        ?.includes(searchQuery.toLowerCase()) ||
      customersItem?.status?.toLowerCase()?.includes(searchQuery.toLowerCase());

    const matchesFilterStatus =
      !filterStatus || customersItem.auth_status === filterStatus;

    return matchesSearchQuery && matchesFilterStatus;
  });

  // Calculate paginated data
  const totalAccounts = filteredAgents?.length;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedAgent = filteredAgents?.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setRowsPerPage(pageSize);
  };

  
  

  const getStatusColorClass = (status) => {
    switch (status) {
      case "EDIT_WAIT_AUTH":
        return "text-blue-500 bg-blue-100 p-1 rounded";
      case "COMPLETE":
        return "text-green-500 bg-green-100 p-1 rounded";
      case "INCOMPLETE":
        return "text-red-500 bg-red-100 p-1 rounded";
      case "DEAUTH":
        return "text-orange-500 bg-orange-100 p-1 rounded";
      case "AUTH WAIT":
        return "text-yellow-500 bg-yellow-100 p-1 rounded";
      default:
        return "text-gray-500 bg-gray-100 p-1 rounded";
    }
  };

  const handleSearchChange = (query) => setSearchQuery(query);
  const handleFilterChange = (status) => setFilterStatus(status);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const SortIconComponent = (column) => {
    const SortIcon = useSortIcon(sortColumn, sortOrder, column);
    return <SortIcon />;
  };

  return (
    <div className="bg-color-white border shadow-md p-2 mt-2 rounded-md font-roboto text-nowrap">
      <div className="mt-2 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="relative flex items-center">
            <SearchBar
              placeholder={t("search_profile")}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
            />
          </div>
          <div className="relative flex items-center">
            <DropdownFilter
              selectedValue={filterStatus}
              onFilterChange={handleFilterChange}
            />
            <DateRangeFilter
              fromDate={fromDate}
              toDate={toDate}
              onFromDateChange={setFromDate}
              onToDateChange={setToDate}
            />
          </div>
        </div>

        {transformedCustomers.length === 0 ? (
          <div className="text-center text-color-dark-gray my-4 h-[59vh]">
            {t("no data")}
          </div>
        ) : (
          <TableList
            headerKeys={headerKeys}
            data={paginatedAgent}
            sortColumn={sortColumn}
            sortOrder={sortOrder}
            onSort={handleSort}
            getStatusColorClass={getStatusColorClass}
            renderActions={(item, index) => (
              <DropdownMenu
                index={index}
                item={item}
                openDropdowns={openDropdowns}
                toggleDropdown={toggleDropdown}
                closeDropdown={closeDropdown}
                actions={actions}
                onEdit={openCustomerstEditPage}
                onAuth={openCustomersAuthPage}
                onView={openCustomersViewPage}
                onDelete={openCustomersDeletePage}
                userId={userId}
              />
            )}
            SortIconComponent={SortIconComponent}
          />
        )}

        <Pagination
         size="small"
         current={currentPage}
         total={totalAccounts}
         pageSize={pageSize}
         showSizeChanger
         showQuickJumper
         onChange={handlePageChange}
         onShowSizeChange={handlePageSizeChange} 
         showTotal={(total) => t("totalRows", { count: total })}
         className="mt-4 ml-auto"
        />
      </div>
    </div>
  );
};

export default CustomersList;
