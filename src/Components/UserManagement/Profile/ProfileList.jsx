import React, { useState } from "react";
import DropdownMenu from "../User/UserDropdownMenu";
import { useSelector, useDispatch } from "react-redux";
import { setAccTypeSelectedItem } from "../../../Redux/InstaEnrollSlice";
//import { setProfileSelectedItem } from "../../../Redux/UserManagement";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { Pagination } from "antd";
import { useTranslation } from "react-i18next";
import SearchBar from "../../InstaEnroll/Settingss/SearchBar";
import DropdownFilter from "../../InstaEnroll/Settingss/DropdownFilter";
import useSortIcon from "../../InstaEnroll/Settingss/useSortIcon";
import DateRangeFilter from "../../InstaEnroll/Settingss/DateRangeFilter";
import TableList from "../../InstaEnroll/Settingss/Table";

const ProfileList = ({ profile, onUpdate }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [selectedAccount, setSelectedAccount] = useState(null);
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

  const actions = useSelector((store) => store?.instaEnroll?.globalActions);

  const user = useSelector((store) => store?.user?.items);
  const userId = user?.map((items) => items?.user_id);

  const toggleDropdown = (index, ProfileItem) => {
    //console.log(ProfileItem)
    setOpenDropdowns({
      [index]: !openDropdowns[index],
    });
    setSelectedAccount(ProfileItem);
  };

  const closeDropdown = (index) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  const openProfileViewPage = (ProfileItem, index) => {
    dispatch(setAccTypeSelectedItem(ProfileItem));
    //dispatch(setProfileSelectedItem(ProfileItem));
    closeDropdown(index);
    navigate("/body/profileview");
  };

  const openProfileAuthPage = (ProfileItem) => {
    dispatch(setAccTypeSelectedItem(ProfileItem));
    //dispatch(setProfileSelectedItem(ProfileItem))
    navigate(`/body/authprofile/${ProfileItem.profile_id}`);
  };

  const openProfileEditPage = (ProfileItem) => {
    dispatch(setAccTypeSelectedItem(ProfileItem));
    //dispatch(setProfileSelectedItem(ProfileItem))
    navigate(`/body/editprofile/${ProfileItem.profile_id}`);
  };

  const openProfileDeletePage = (ProfileItem) => {
    dispatch(setAccTypeSelectedItem(ProfileItem));
    navigate(`/body/deleteprofile/${ProfileItem.profile_id}`);
  };

  const finalHeaders = profile?.find((obj) => {
    // Check if any key in the object has an "_edited" version
    return Object.keys(obj).some((key) => key.includes("_edited"));
  });

  // If an edited field exists, use the entire object, otherwise fallback to the first object
  const headersToUse = finalHeaders || profile?.[0];

  // Filter out unwanted keys
  const headerKeys = headersToUse
    ? Object.keys(headersToUse).filter(
        (header) =>
          header !== "menu_actions" && header !== "menu_actions_edited"
      )
    : [];

  const sortedAccounts = [...profile].sort((a, b) => {
    if (sortColumn) {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Filter accounts based on the search query
  const filteredProfiles = sortedAccounts?.filter((ProfileItem) => {
    const matchesSearchQuery =
      ProfileItem.profile_id
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      ProfileItem.profile_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      ProfileItem.auth_status.toLowerCase().includes(searchQuery.toLowerCase());

    const itemDate = new Date(ProfileItem.created_time); // Replace 'date' with your date field
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const matchesDateRange =
      (!from || itemDate >= from) && (!to || itemDate <= to);

    const matchesFilterStatus =
      !filterStatus || ProfileItem.auth_status === filterStatus;

    return matchesSearchQuery && matchesFilterStatus;
  });

  const handleSearchChange = (query) => setSearchQuery(query);
  const handleFilterChange = (status) => setFilterStatus(status);

  // Pagination logic
  const totalAccounts = filteredProfiles?.length;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedProfile = filteredProfiles?.slice(
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
    <div className="bg-color-white border shadow-md p-2 mt-2 rounded-md">
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

        {filteredProfiles.length === 0 ? (
          <div className="text-center text-color-dark-gray my-4 h-[60vh]">
            {t("no data")}
          </div>
        ) : (
          <TableList
            headerKeys={headerKeys}
            data={paginatedProfile}
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
                onEdit={openProfileEditPage}
                onAuth={openProfileAuthPage}
                onView={openProfileViewPage}
                onDelete={openProfileDeletePage}
                userId={userId}
              />
            )}
            SortIconComponent={SortIconComponent}
          />
        )}

        <Pagination
          className="mt-4 ml-auto font-roboto text-md"
          size="small"
          current={currentPage}
          total={totalAccounts}
          pageSize={rowsPerPage}
          showSizeChanger
          showQuickJumper
          onChange={handlePageChange}
          showTotal={(total) => t("totalRows", { count: total })}
        />
      </div>
    </div>
  );
};

export default ProfileList;
