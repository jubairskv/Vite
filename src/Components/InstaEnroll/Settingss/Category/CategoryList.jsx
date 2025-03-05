import React, { useState } from "react";
import DropdownMenu from "../../../UserManagement/User/UserDropdownMenu";
import { useSelector, useDispatch } from "react-redux";
import { setCategorySelectedItem } from "../../../../Redux/InstaEnrollSlice";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import { useTranslation } from "react-i18next";
import SearchBar from "../SearchBar";
import DropdownFilter from "../DropdownFilter";
import useSortIcon from "../useSortIcon";
import DateRangeFilter from "../DateRangeFilter";
import TableList from "../Table";

const CategoryList = ({ category }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterStatus, setFilterStatus] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  //DateRangeFIlter state
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const actions = useSelector((store) => store.instaEnroll.globalActions);
  const user = useSelector((store) => store?.user?.items);
  const userId = user?.map((items) => items.user_id);

  const toggleDropdown = (index, categoryItem) => {
    setOpenDropdowns({
      [index]: !openDropdowns[index],
    });
    setSelectedCategory(categoryItem);
  };

  const closeDropdown = (index) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  const openCategoryViewPage = (categoryItem, index) => {
    dispatch(setCategorySelectedItem(categoryItem));
    closeDropdown(index);
    navigate(`/body/viewcategory/${categoryItem.id}`);
  };

  const openCategoryAuthPage = (categoryItem) => {
    dispatch(setCategorySelectedItem(categoryItem));
    navigate(`/body/authcategory/${categoryItem.id}`);
  };

  const openCategoryEditPage = (categoryItem) => {
    dispatch(setCategorySelectedItem(categoryItem));
    navigate(`/body/editcatgeory/${categoryItem.id}`);
  };

  const openCategoryDeletePage = (categoryItem) => {
    dispatch(setCategorySelectedItem(categoryItem));
    navigate(`/body/deletecategory/${categoryItem.id}`);
  };

  //dynamic header:
  const finalHeaders = category?.find((obj) => {
    // Check if any key in the object has an "_edited" version
    return Object.keys(obj).some((key) => key.includes("_edited"));
  });

  // If an edited field exists, use the entire object, otherwise fallback to the first object
  const headersToUse = finalHeaders ? finalHeaders : category?.[0];

  const headerKeys = finalHeaders
    ? Object.keys(finalHeaders) // If we found the edited object, get its keys
    : headersToUse
    ? Object.keys(headersToUse)
    : [];

  const sortedAccounts = [...category].sort((a, b) => {
    if (sortColumn) {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Filter accounts based on the search query
  const filteredCategories = sortedAccounts?.filter((categoryItem) => {
    const matchesSearchQuery =
      categoryItem?.id
        ?.toString()
        ?.toLowerCase()
        ?.includes(searchQuery.toLowerCase()) ||
      categoryItem?.type_name
        ?.toLowerCase()
        ?.includes(searchQuery.toLowerCase()) ||
      categoryItem?.description
        ?.toLowerCase()
        ?.includes(searchQuery.toLowerCase()) ||
      categoryItem?.auth_status
        ?.toLowerCase()
        ?.includes(searchQuery.toLowerCase());

    const itemDate = new Date(categoryItem.created_time); // Replace 'date' with your date field
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const matchesDateRange =
      (!from || itemDate >= from) && (!to || itemDate <= to);

    const matchesFilterStatus =
      !filterStatus || categoryItem.auth_status === filterStatus;

    return matchesSearchQuery && matchesFilterStatus && matchesDateRange;
  });

  const handleSearchChange = (query) => setSearchQuery(query);
  const handleFilterChange = (status) => setFilterStatus(status);

  // Pagination logic
  const totalAccounts = filteredCategories.length;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedCategory = filteredCategories.slice(
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
    <div className="bg-color-white border shadow-md p-2 mt-2 rounded-md font-roboto text-nowrap">
      <div className="mt-2 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="relative flex items-center">
            <SearchBar
              placeholder={t("search_category")}
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

        {filteredCategories.length === 0 ? (
          <div className="text-center text-color-dark-gray my-4 h-[60vh]">
            {t("no data")}
          </div>
        ) : (
          <TableList
            headerKeys={headerKeys}
            data={paginatedCategory}
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
                onEdit={openCategoryEditPage}
                onAuth={openCategoryAuthPage}
                onView={openCategoryViewPage}
                onDelete={openCategoryDeletePage}
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

export default CategoryList;
