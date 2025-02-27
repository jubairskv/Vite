// import React, { useState } from "react";
// import DropdownMenuAccountSub from "../../UserManagement/User/UserDropdownMenu";
// import { useSelector, useDispatch } from "react-redux";
// import { setCustomersSelectedItem } from "../../../Redux/CustomersEpurse";
// import { useNavigate } from "react-router-dom";
// import { IoIosSearch } from "react-icons/io";
// import { Pagination } from "antd";
// import { useTranslation } from "react-i18next";

// const CustomersList = ({ customers }) => {
//   const [openDropdowns, setOpenDropdowns] = useState({});
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedAccountSub, setSelectedAccountSub] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { t } = useTranslation();

//   const actions = useSelector((store) => store.instaEnroll.globalActions);
//   const user = useSelector((store) => store?.user?.items);
//   const userId = user?.map((items) => items.user_id);

//   const toggleDropdown = (index, accountSubItem) => {
//     setOpenDropdowns({
//       [index]: !openDropdowns[index],
//     });
//     setSelectedAccountSub(accountSubItem);
//   };

//   const closeDropdown = (index) => {
//     setOpenDropdowns((prev) => ({
//       ...prev,
//       [index]: false,
//     }));
//   };

//   const openCustomersViewPage = (customers, index) => {
//     dispatch(setCustomersSelectedItem(customers));
//     toggleDropdown(index, customers);
//     navigate("/body/viewcustomers");
//   };

//   const openCustomersAuthPage = (customers) => {
//     dispatch(setCustomersSelectedItem(customers));
//     navigate(`/body/authaccountsubtype/${customers.id}`);
//   };

//   const openCustomersEditPage = (customers) => {
//     dispatch(setCustomersSelectedItem(customers));
//     navigate(`/body/editaccountsubtype/${customers.id}`);
//   };

//   const openCustomersDeletePage = (customers) => {
//     dispatch(setCustomersSelectedItem(customers));
//     navigate(`/body/deleteaccountsubtype/${customers.id}`);
//   };

//   // Get all headers dynamically from the first accountSub item
//   const headers = customers?.[0] ? Object.keys(customers[0]) : [];
//   console.log(headers);

//   // Filter accounts based on the search query
//   const filteredAccounts = customers?.filter((customers) => {
//     return headers.some((key) =>
//       customers[key]
//         ?.toString()
//         ?.toLowerCase()
//         ?.includes(searchQuery.toLowerCase())
//     );
//   });

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

//   return (
//     <div className="bg-color-white border shadow-md p-2 mt-2 rounded-md font-roboto">
//       <div className="mt-2 flex flex-col">
//         <div className="flex justify-between items-center mb-4">
//           <div className="relative flex items-center">
//             <IoIosSearch className="absolute left-2 text-color-dark-gray" />
//             <input
//               type="text"
//               placeholder={t(`search_profile`)}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="outline-none border rounded p-2 pl-10"
//             />
//           </div>
//         </div>

//         {filteredAccounts.length === 0 ? (
//           <div className="text-center text-color-dark-gray my-4 h-[60vh]">
//             {t("no data")}
//           </div>
//         ) : (
//           <div className="relative w-full h-[60vh] overflow-x-auto scrollbar scrollbar-thumb-scrollbar-color-gray scrollbar-thumb-rounded-full scrollbar-w-2">
//             <table className="w-full divide-y divide-color-gray-200 table-fixed">
//               <thead className="bg-color-dim-gray">
//                 <tr>
//                   {headers.map((header, index) => (
//                     <th
//                       key={index}
//                       className="text-base font-bold border text-color-header-dark-gray tracking-wider p-4 min-w-[190px] sticky top-0 bg-color-dim-gray z-10"
//                     >
//                       {t(header)}
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
//                     {headers.map((header, i) => (
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
//                         onEdit={openCustomersEditPage}
//                         onAuth={openCustomersAuthPage}
//                         onView={openCustomersViewPage}
//                         onDelete={openCustomersDeletePage}
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

// export default CustomersList;
