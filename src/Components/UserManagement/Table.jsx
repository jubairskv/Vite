// import React from "react";
// import DropdownMenuProfile from "../../Components/UserManagement/User/UserDropdownMenu";

// const ReusableTable = ({
//   headers,
//   rows,
//   openDropdowns,
//   toggleDropdown,
//   closeDropdown,
//   actions,
//   onAuth,
//   onView,
//   userId,
// }) => {
//   return (
//     <div className="relative w-full  max-h-[28rem] overflow-x-auto scrollbar scrollbar-thumb-gray-00  scrollbar-thumb-rounded-full scrollbar-w-2 ">
//       <table className="w-full divide-y divide-color-gray-200 table-fixed">
//         <div>
//           <thead className="bg-color-dim-gray">
//             <tr>
//               {headers
//                 .filter((header) => header !== "menu_actions")
//                 .map((header, index) => (
//                   <th
//                     key={index}
//                     className="text-base font-bold border text-color-header-dark-gray tracking-wider p-4 min-w-[190px] sticky top-0 bg-color-dim-gray z-10"
//                   >
//                     {header.replace(/_/g, " ")}{" "}
//                   </th>
//                 ))}

//               <th className="text-base font-bold border text-color-header-dark-gray tracking-wider w-32 px-8 sticky top-0 bg-color-dim-gray right-0  z-10">
//                 actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map((ProfileItem, index) => (
//               <tr key={ProfileItem.profile_id}>
//                 {headers
//                   .filter((header) => header !== "menu_actions")
//                   .map((header, i) => (
//                     <td
//                       key={i}
//                       className="top-1 text-nowrap border text-sm text-color-dark-gray p-4 min-w-[190px] z-5"
//                     >
//                       {ProfileItem[header]}
//                     </td>
//                   ))}

//                 <td className=" sticky top-1 bg-color-white  whitespace-nowrap text-sm border  text-color-dark-gray  right-0 z-5">
//                   <DropdownMenuProfile
//                     index={index}
//                     item={rows}
//                     openDropdowns={openDropdowns}
//                     toggleDropdown={toggleDropdown}
//                     closeDropdown={closeDropdown}
//                     actions={actions}
//                     onAuth={onAuth}
//                     onView={onView}
//                     userId={userId}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </div>
//       </table>
//     </div>
//   );
// };

// export default ReusableTable;
