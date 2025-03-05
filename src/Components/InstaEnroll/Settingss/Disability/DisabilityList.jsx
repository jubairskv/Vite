import React, { useState } from "react";
import DropdownMenu from "../../../UserManagement/User/UserDropdownMenu";
import { useSelector, useDispatch } from "react-redux";
import { setDisabilitySelectedItem } from "../../../../Redux/InstaEnrollSlice";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { Pagination } from "antd";
import { useTranslation } from "react-i18next";
import SearchBar from "../SearchBar";
import DropdownFilter from "../DropdownFilter";
import useSortIcon from "../useSortIcon";
import DateRangeFilter from "../DateRangeFilter";
import TableList from "../Table";

const DisabilityList = ({ disability }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [selectedDisability, setSelectedDisability] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterStatus, setFilterStatus] = useState("");

  //DateRangeFIlter state
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const actions = useSelector((store) => store.instaEnroll.globalActions);
  const DropdownAction = useSelector((store) => store.user.dropdownActions);
  const user = useSelector((store) => store?.user?.items);

  const userId = user?.map((items) => items.user_id);

  const toggleDropdown = (index, disabilityItem) => {
    setOpenDropdowns({
      [index]: !openDropdowns[index],
    });
    setSelectedDisability(disabilityItem);
  };

  const closeDropdown = (index) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  const openDisabilityViewPage = (disabilityItem, index) => {
    dispatch(setDisabilitySelectedItem(disabilityItem));
    closeDropdown(index);
    navigate(`/body/viewdisability/${disabilityItem.id}`);
  };

  const openDisabilityAuthPage = (disabilityItem) => {
    dispatch(setDisabilitySelectedItem(disabilityItem));
    navigate(`/body/authdisability/${disabilityItem.id}`);
  };

  const openDisabilityEditPage = (disabilityItem) => {
    dispatch(setDisabilitySelectedItem(disabilityItem));
    navigate(`/body/editdisability/${disabilityItem.id}`);
  };

  const openDisabilityDeletePage = (disabilityItem) => {
    dispatch(setDisabilitySelectedItem(disabilityItem));
    navigate(`/body/deletedisability/${disabilityItem.id}`);
  };

  //const headers = disability?.[0] ? Object.keys(disability[0]) : [];

  //dynamic header:
  const finalHeaders = disability?.find((obj) => {
    // Check if any key in the object has an "_edited" version
    return Object.keys(obj).some((key) => key.includes("_edited"));
  });

  // If an edited field exists, use the entire object, otherwise fallback to the first object
  const headersToUse = finalHeaders ? finalHeaders : disability?.[0];

  const headerKeys = finalHeaders
    ? Object.keys(finalHeaders) // If we found the edited object, get its keys
    : headersToUse
    ? Object.keys(headersToUse)
    : [];

  //sort ascending and descending in header:
  const sortedAccounts = [...disability].sort((a, b) => {
    if (sortColumn) {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Filter accounts based on the search query
  const filteredDisability = sortedAccounts?.filter((disabilityItem) => {
    const matchesSearchQuery =
      disabilityItem.id
        ?.toString()
        ?.toLowerCase()
        ?.includes(searchQuery.toLowerCase()) ||
      disabilityItem.disability_name
        ?.toLowerCase()
        ?.includes(searchQuery.toLowerCase()) ||
      disabilityItem.description
        ?.toLowerCase()
        ?.includes(searchQuery.toLowerCase()) ||
      disabilityItem.auth_status
        ?.toLowerCase()
        ?.includes(searchQuery.toLowerCase());

    const itemDate = new Date(disabilityItem.created_time); // Replace 'date' with your date field
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const matchesDateRange =
      (!from || itemDate >= from) && (!to || itemDate <= to);

    const matchesFilterStatus =
      !filterStatus || disabilityItem.auth_status === filterStatus;

    return matchesSearchQuery && matchesFilterStatus && matchesDateRange;
  });

  const handleSearchChange = (query) => setSearchQuery(query);
  const handleFilterChange = (status) => setFilterStatus(status);

  // Pagination logic
  const totalAccounts = filteredDisability.length;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedDisability = filteredDisability.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const getStatusColorClass = (status) => {
    switch (status) {
      case "EDIT_WAIT_AUTH":
        return "text-blue-500 bg-blue-100 p-1 rounded";
      case "AUTHORIZED":
        return "text-green-500 bg-green-100 p-1 rounded";
      case "DEL_WAIT_AUTH":
        return "text-red-500 bg-red-100 p-1 rounded";
      case "DEAUTH":
        return "text-orange-500 bg-orange-100 p-1 rounded";
      case "AUTH WAIT":
        return "text-yellow-500 bg-yellow-100 p-1 rounded";
      default:
        return "text-gray-500 bg-gray-100 p-1 rounded";
    }
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setRowsPerPage(pageSize);
  };

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
              placeholder={t("search_disability")}
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

        {filteredDisability.length === 0 ? (
          <div className="text-center text-color-dark-gray my-4 h-[60vh]">
            {t("no data")}
          </div>
        ) : (
          <TableList
            headerKeys={headerKeys}
            data={paginatedDisability}
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
                onEdit={openDisabilityEditPage}
                onAuth={openDisabilityAuthPage}
                onView={openDisabilityViewPage}
                onDelete={openDisabilityDeletePage}
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
          pageSize={rowsPerPage}
          showSizeChanger
          showQuickJumper
          onChange={handlePageChange}
          showTotal={(total) => t("totalRows", { count: total })}
          className="mt-4 ml-auto"
        />
      </div>
    </div>
  );
};

export default DisabilityList;
