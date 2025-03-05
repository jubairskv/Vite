import React, { useState } from "react";
import DropdownMenu from "../../../UserManagement/User/UserDropdownMenu";
import { useSelector, useDispatch } from "react-redux";
import { setRelationshipSelectedItem } from "../../../../Redux/InstaEnrollSlice";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import { useTranslation } from "react-i18next";
import SearchBar from "../SearchBar";
import DropdownFilter from "../DropdownFilter";
import useSortIcon from "../useSortIcon";
import DateRangeFilter from "../DateRangeFilter";
import TableList from "../Table";

const RelationshipList = ({ relationship }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [selectedRelationship, setSelectedRealtionship] = useState(null);
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

  const toggleDropdown = (index, relationshipItem) => {
    setOpenDropdowns({
      [index]: !openDropdowns[index],
    });
    setSelectedRealtionship(relationshipItem);
  };

  const closeDropdown = (index) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  const openRelationshipViewPage = (relationshipItem, index) => {
    console.log(relationshipItem);
    dispatch(setRelationshipSelectedItem(relationshipItem));
    console.log(relationshipItem);
    closeDropdown(index);
    navigate(`/body/viewrelationship/${relationshipItem.id}`);
  };

  const openRelationshipAuthPage = (relationshipItem) => {
    dispatch(setRelationshipSelectedItem(relationshipItem));
    navigate(`/body/authrelationship/${relationshipItem.id}`);
  };

  const openRelationshipEditPage = (relationshipItem) => {
    dispatch(setRelationshipSelectedItem(relationshipItem));
    navigate(`/body/editrelationship/${relationshipItem.id}`);
  };

  const openRelationshipDeletePage = (relationshipItem) => {
    dispatch(setRelationshipSelectedItem(relationshipItem));
    navigate(`/body/deleterelationship/${relationshipItem.id}`);
  };

  //dynamic header:
  const finalHeaders = relationship?.find((obj) => {
    // Check if any key in the object has an "_edited" version
    return Object.keys(obj).some((key) => key.includes("_edited"));
  });

  // If an edited field exists, use the entire object, otherwise fallback to the first object
  const headersToUse = finalHeaders ? finalHeaders : relationship?.[0];

  const headerKeys = finalHeaders
    ? Object.keys(finalHeaders) // If we found the edited object, get its keys
    : headersToUse
    ? Object.keys(headersToUse)
    : [];

  //sort ascending and descending in header:
  const sortedAccounts = [...relationship].sort((a, b) => {
    if (sortColumn) {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Filter accounts based on the search query
  const filteredRelationship = sortedAccounts?.filter((relationshipItem) => {
    const matchesSearchQuery =
      relationshipItem?.id
        ?.toString()
        ?.toLowerCase()
        ?.includes(searchQuery.toLowerCase()) ||
      relationshipItem?.relationship_name
        ?.toLowerCase()
        ?.includes(searchQuery.toLowerCase()) ||
      relationshipItem?.description
        ?.toLowerCase()
        ?.includes(searchQuery.toLowerCase()) ||
      relationshipItem?.auth_status
         ?.toLowerCase()
         ?.includes(searchQuery.toLowerCase());

    const itemDate = new Date(relationshipItem.created_time); // Replace 'date' with your date field
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const matchesDateRange =
      (!from || itemDate >= from) && (!to || itemDate <= to);

    const matchesFilterStatus =
      !filterStatus || relationshipItem.auth_status === filterStatus;

    return matchesSearchQuery && matchesFilterStatus && matchesDateRange;
  });

  const handleSearchChange = (query) => setSearchQuery(query);
  const handleFilterChange = (status) => setFilterStatus(status);

  // Pagination logic
  const totalAccounts = filteredRelationship.length;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedRelationShip = filteredRelationship.slice(
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
              placeholder={t("search_relationship")}
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

        {filteredRelationship.length === 0 ? (
          <div className="text-center text-color-dark-gray my-4 h-[60vh]">
            {t("no data")}
          </div>
        ) : (
          <TableList
            headerKeys={headerKeys}
            data={paginatedRelationShip}
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
                onEdit={openRelationshipEditPage}
                onAuth={openRelationshipAuthPage}
                onView={openRelationshipViewPage}
                onDelete={openRelationshipDeletePage}
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

export default RelationshipList;
