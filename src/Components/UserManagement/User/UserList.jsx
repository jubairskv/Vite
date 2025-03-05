import React, { useState } from "react";
import DropdownMenu from "./UserDropdownMenu";
import { useSelector, useDispatch } from "react-redux";
import { setUserSelItem } from "../../../Redux/UserManagement";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../InstaEnroll/Settingss/SearchBar";
import DropdownFilter from "../../InstaEnroll/Settingss/DropdownFilter";
import useSortIcon from "../../InstaEnroll/Settingss/useSortIcon";
import { Pagination } from "antd";
import { useTranslation } from "react-i18next";
import DateRangeFilter from "../../InstaEnroll/Settingss/DateRangeFilter";
import TableList from "../../InstaEnroll/Settingss/Table";

const UserList = ({ user }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //DateRangeFIlter state
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const actions = useSelector((store) => store.instaEnroll.globalActions);
  console.log(actions);

  const authActionId = useSelector(
    (store) => store.instaEnroll.globalActionsId
  );

  // const DropdownAction = useSelector((store) => store.user.dropdownActions);
  const userdata = useSelector((store) => store?.user?.items);
  const userId = userdata?.map((items) => items.user_id);

  const toggleDropdown = (index, UserItem) => {
    //console.log(ProfileItem)
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

  const openUserViewPage = (UserItem, index) => {
    dispatch(setUserSelItem(UserItem));
    closeDropdown(index);
    navigate("/body/viewuser");
  };

  const openUserEditPage = (UserItem) => {
    console.log(UserItem);
    dispatch(setUserSelItem(UserItem));
    navigate(`/body/edituser/${UserItem.user_id}`);
  };

  const openUserAuthPage = (UserItem) => {
    dispatch(setUserSelItem(UserItem));
    navigate(`/body/authuser/${UserItem.user_id}`);
  };

  const openUserDeletePage = (UserItem) => {
    dispatch(setUserSelItem(UserItem));
    navigate(`/body/deleteuser/${UserItem.user_id}`);
  };

  // const headers = user?.[2] ? Object.keys(user[2]) : [];

  const finalHeaders = user?.find((obj) => {
    // Check if any key in the object has an "_edited" version
    return Object.keys(obj).some((key) => key.includes("_edited"));
  });

  // If an edited field exists, use the entire object, otherwise fallback to the first object
  const headersToUse = finalHeaders ? finalHeaders : user?.[0];

  const headerKeys = finalHeaders
    ? Object.keys(finalHeaders) // If we found the edited object, get its keys
    : headersToUse
    ? Object.keys(headersToUse)
    : [];

  const sortedAccounts = [...user].sort((a, b) => {
    if (sortColumn) {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Filter accounts based on the search query
  const filteredUser = sortedAccounts?.filter((UserItem) => {
    const matchesSearchQuery =
      UserItem.user_id
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      UserItem.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      UserItem.auth_status.toLowerCase().includes(searchQuery.toLowerCase());

    const itemDate = new Date(UserItem.created_time); // Replace 'date' with your date field
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const matchesDateRange =
      (!from || itemDate >= from) && (!to || itemDate <= to);

    const matchesFilterStatus =
      !filterStatus || UserItem.auth_status === filterStatus;

    return matchesSearchQuery && matchesFilterStatus && matchesDateRange;
  });

  const handleSearchChange = (query) => setSearchQuery(query);
  const handleFilterChange = (status) => setFilterStatus(status);

  // Pagination logic
  const totalAccounts = filteredUser.length;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedUser = filteredUser.slice(
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
    <div className="bg-color-white border shadow-md p-2 mt-2 rounded-md ">
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

        {filteredUser.length === 0 ? (
          <div className="text-center text-color-dark-gray my-4 h-[60vh]">
            {t("no data")}
          </div>
        ) : (
          <TableList
            headerKeys={headerKeys}
            data={paginatedUser}
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
                onEdit={openUserEditPage}
                onAuth={openUserAuthPage}
                onView={openUserViewPage}
                onDelete={openUserDeletePage}
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
          className="mt-4 ml-auto font-roboto"
        />
      </div>
    </div>
  );
};

export default UserList;
