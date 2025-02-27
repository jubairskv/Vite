// import React, { useState } from "react";
// import DropdownMenuAccountSub from "../../UserManagement/User/UserDropdownMenu";
// import { useSelector, useDispatch } from "react-redux";
// import { setLeadsSelectedItem } from "../../../Redux/CustomersEpurse";
// import { useNavigate } from "react-router-dom";
// import { IoIosSearch } from "react-icons/io";
// import { Pagination } from "antd";
// import { useTranslation } from "react-i18next";
// import SearchBar from "../../InstaEnroll/Settingss/SearchBar";
// import DropdownFilter from "../../InstaEnroll/Settingss/DropdownFilter";
// import useSortIcon from "../../InstaEnroll/Settingss/useSortIcon";

// const LeadsList = ({ leads }) => {
//   const [openDropdowns, setOpenDropdowns] = useState({});
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedAccountSub, setSelectedAccountSub] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [filterStatus, setFilterStatus] = useState("");
//   const [sortColumn, setSortColumn] = useState("");
//   const [sortOrder, setSortOrder] = useState("asc");

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { t } = useTranslation();

//   const actions = useSelector((store) => store.instaEnroll.globalActions);
//   const user = useSelector((store) => store?.user?.items);
//   const userId = user?.map((items) => items.user_id);

//   const toggleDropdown = (index, leadsItem) => {
//     setOpenDropdowns({
//       [index]: !openDropdowns[index],
//     });
//     setSelectedAccountSub(leadsItem);
//   };

//   const closeDropdown = (index) => {
//     setOpenDropdowns((prev) => ({
//       ...prev,
//       [index]: false,
//     }));
//   };

//   const openLeadsViewPage = (leadsItem, index) => {
//     dispatch(setLeadsSelectedItem(leadsItem));
//     closeDropdown(index);
//     navigate("/body/viewcustomers");
//   };

//   const openLeadsAuthPage = (leadsItem) => {
//     dispatch(setLeadsSelectedItem(leadsItem));
//     navigate(`/body/authaccountsubtype/${leadsItem.id}`);
//   };

//   const openLeadsEditPage = (leadsItem) => {
//     dispatch(setLeadsSelectedItem(leadsItem));
//     navigate(`/body/editaccountsubtype/${leadsItem.id}`);
//   };

//   const openLeadsDeletePage = (leadsItem) => {
//     dispatch(setLeadsSelectedItem(leadsItem));
//     navigate(`/body/deleteaccountsubtype/${leadsItem.id}`);
//   };

//   // Get all headers dynamically from the first accountSub item
//   const headers = leads?.[0] ? Object.keys(leads[0]) : [];
//   console.log(headers);

//   const finalHeaders = leads?.find((obj) => {
//     // Check if any key in the object has an "_edited" version
//     return Object.keys(obj).some((key) => key.includes("_edited"));
//   });

//   // If an edited field exists, use the entire object, otherwise fallback to the first object
//   const headersToUse = finalHeaders ? finalHeaders : leads?.[0];

//   const headerKeys = finalHeaders
//     ? Object.keys(finalHeaders) // If we found the edited object, get its keys
//     : headersToUse ? Object.keys(headersToUse) : [];

//   const sortedAccounts = [...leads].sort((a, b) => {
//     if (sortColumn) {
//       const aValue = a[sortColumn];
//       const bValue = b[sortColumn];
//       if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
//       if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
//     }
//     return 0;
//   });

//   const filteredAccounts = sortedAccounts?.filter((qualificationItem) => {
//     const matchesSearchQuery =
//       qualificationItem.id
//         .toString()
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase()) ||
//       qualificationItem.type_name
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase()) ||
//       qualificationItem.description
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase());

//     const matchesFilterStatus =
//       !filterStatus || qualificationItem.auth_status === filterStatus;

//     return matchesSearchQuery && matchesFilterStatus;
//   });

//   const handleSearchChange = (query) => setSearchQuery(query);
//   const handleFilterChange = (status) => setFilterStatus(status);

//   // Pagination logic
//   const totalAccounts = filteredAccounts.length;
//   const startIndex = (currentPage - 1) * rowsPerPage;
//   const paginatedAccounts = filteredAccounts.slice(
//     startIndex,
//     startIndex + rowsPerPage
//   );

//   const handlePageChange = (page, pageSize) => {
//     setCurrentPage(page);
//     setRowsPerPage(pageSize);
//   };

//   const handleSort = (column) => {
//     if (sortColumn === column) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortColumn(column);
//       setSortOrder("asc");
//     }
//   };

//   const SortIconComponent = (column) => {
//     const SortIcon = useSortIcon(sortColumn, sortOrder, column);
//     return <SortIcon />;
//   };

//   return (
//     <div className="bg-color-white border shadow-md p-2 mt-2 rounded-md font-roboto">
//       <div className="mt-2 flex flex-col">
//         <div className="flex justify-between items-center mb-4">
//           <div className="relative flex items-center">
//             <SearchBar
//               placeholder={t("search_profile")}
//               searchQuery={searchQuery}
//               onSearchChange={handleSearchChange}
//             />
//           </div>
//           <DropdownFilter
//             selectedValue={filterStatus}
//             onFilterChange={handleFilterChange}
//           />
//         </div>

//         {filteredAccounts.length === 0 ? (
//           <div className="text-center text-color-dark-gray my-4">{t("no data")}</div>
//         ) : (
//           <div className="relative w-full max-h-[28rem] overflow-x-auto scrollbar scrollbar-thumb-scrollbar-color-gray scrollbar-thumb-rounded-full scrollbar-w-2">
//             <table className="w-full divide-y divide-color-gray-200 table-fixed">
//               <thead className="bg-color-dim-gray">
//                 <tr>
//                   {headerKeys.map((header, index) => (
//                     <th
//                       key={index}
//                       onClick={() => handleSort(header)}
//                       className="text-base font-bold border text-color-header-dark-gray tracking-wider p-4 min-w-[190px] sticky top-0 bg-color-dim-gray z-10"
//                     >
//                       <div className="flex justify-between items-center">
//                         {t(header)}
//                         <span>{SortIconComponent(header)}</span>
//                       </div>
//                     </th>
//                   ))}
//                   <th className="text-base font-bold border text-color-header-dark-gray tracking-wider w-32 px-8 sticky top-0 bg-color-dim-gray z-10 right-0">
//                     {t("actions")}
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedAccounts.map((customers, index) => (
//                   <tr key={customers.id}>
//                     {headerKeys.map((header, i) => (
//                       <td
//                         key={i}
//                         className="top-1 text-nowrap border text-sm text-color-dark-gray p-4 min-w-[190px] z-5 font-roboto"
//                       >
//                         {typeof customers[header] === "object" &&
//                         customers[header] !== null
//                           ? customers[header]?.name ||
//                             JSON.stringify(customers[header])
//                           : customers[header] === null
//                           ? "No Data"
//                           : customers[header]}
//                       </td>
//                     ))}

//                     <td className="sticky top-1 bg-color-white whitespace-nowrap border text-color-dark-gray right-0 z-5 font-roboto">
//                       <DropdownMenuAccountSub
//                         index={index}
//                         item={customers}
//                         openDropdowns={openDropdowns}
//                         toggleDropdown={toggleDropdown}
//                         closeDropdown={closeDropdown}
//                         actions={actions}
//                         onEdit={openLeadsEditPage}
//                         onAuth={openLeadsAuthPage}
//                         onView={openLeadsViewPage}
//                         onDelete={openLeadsDeletePage}
//                         userId={userId}
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         <Pagination
//           size="small"
//           current={currentPage}
//           total={totalAccounts}
//           pageSize={rowsPerPage}
//           showSizeChanger
//           showQuickJumper
//           onChange={handlePageChange}
//           showTotal={(total) => t("totalRows", { count: total })}
//           className="mt-4 ml-auto font-roboto"
//         />
//       </div>
//     </div>
//   );
// };

// export default LeadsList;
