import React, { useState } from "react";
import DropdownMenu from "../../UserManagement/User/UserDropdownMenu";
import { useSelector, useDispatch } from "react-redux";
import { setAgentSelectedItem } from "../../../Redux/InstaEnrollSlice";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import { useTranslation } from "react-i18next";
import SearchBar from "../Settingss/SearchBar";
import DropdownFilter from "../Settingss/DropdownFilter";
import useSortIcon from "../Settingss/useSortIcon";
import DateRangeFilter from "../Settingss/DateRangeFilter";
import TableList from "../Settingss/Table";

const AgentList = ({ agent, onUpdate }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page with default as 10

  //DateRangeFIlter state
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const token = useSelector((store) => store.token.token);
  const deviceId = useSelector((store) => store.token.deviceId);
  const actions = useSelector((store) => store.instaEnroll.globalActions);
  const DropdownAction = useSelector((store) => store.user.dropdownActions);
  const user = useSelector((store) => store?.user?.items);

  const userId = user?.map((items) => items.user_id);

  const toggleDropdown = (index, agentItem) => {
    setOpenDropdowns({
      [index]: !openDropdowns[index], // Toggle only the selected dropdown
    });
    setSelectedAgent(agentItem);
  };

  const closeDropdown = (index) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  const openAgentViewPage = (agentItem, index) => {
    dispatch(setAgentSelectedItem(agentItem));
    closeDropdown(index);
    navigate(`/body/viewagent`);
  };

  const openAgentAuthPage = (agentItem) => {
    dispatch(setAgentSelectedItem(agentItem));
    navigate(`/body/authagent/${agentItem.agent_id}`);
  };

  const openAgentEditPage = (agentItem) => {
    console.log(agentItem);
    dispatch(setAgentSelectedItem(agentItem));
    navigate(`/body/editagent/${agentItem.agent_id}`);
  };

  const openAgentDeletePage = (agentItem) => {
    dispatch(setAgentSelectedItem(agentItem));
    navigate(`/body/deleteagent/${agentItem.agent_id}`);
  };

  const finalHeaders = agent?.find((obj) => {
    // Check if any key in the object has an "_edited" version
    return Object.keys(obj).some((key) => key.includes("_edited"));
  });

  // If an edited field exists, use the entire object, otherwise fallback to the first object
  const headersToUse = finalHeaders ? finalHeaders : agent?.[0];

  const headerKeys = finalHeaders
    ? Object.keys(finalHeaders) // If we found the edited object, get its keys
    : headersToUse
    ? Object.keys(headersToUse)
    : [];

  const sortedAccounts = [...agent].sort((a, b) => {
    if (sortColumn) {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Filter accounts based on the search query
  const filteredAgents = sortedAccounts?.filter((agentItem) => {
    const matchesSearchQuery =
      agentItem?.agent_id
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      agentItem?.agent_name
      ?.toLowerCase()
      ?.includes(searchQuery.toLowerCase()) ||
      agentItem?.status
      ?.toString()
      ?.toLowerCase()
      ?.includes(searchQuery.toLowerCase()) ||
      agentItem?.auth_status
      ?.toLowerCase()
      ?.includes(searchQuery.toLocaleLowerCase()) ||
      agentItem ?.process_status
      ?.toString()
      ?.toLowerCase()
      ?.includes(searchQuery.toLocaleLowerCase());


    const matchesFilterStatus =
      !filterStatus || agentItem.auth_status === filterStatus;

    return matchesSearchQuery && matchesFilterStatus;
  });

  const handleSearchChange = (query) => setSearchQuery(query);
  const handleFilterChange = (status) => setFilterStatus(status);

  // Pagination logic
  const totalAccounts = filteredAgents?.length;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedAgent = filteredAgents?.slice(
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
              placeholder={t("search_customertype")}
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

        {filteredAgents.length === 0 ? (
          <div className="text-center text-color-dark-gray my-4">
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
                onEdit={openAgentEditPage}
                onAuth={openAgentAuthPage}
                onView={openAgentViewPage}
                onDelete={openAgentDeletePage}
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

export default AgentList;
