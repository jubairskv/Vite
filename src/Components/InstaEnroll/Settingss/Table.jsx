import React from "react";
import { useTranslation } from "react-i18next";

const ReusableTable = ({
  headerKeys,
  data,
  sortColumn,
  sortOrder,
  onSort,
  getStatusColorClass,
  renderActions,
  SortIconComponent,
}) => {
  const { t } = useTranslation();
  return (
    <div className="relative w-full h-[59vh]  overflow-auto scrollbar scrollbar-thumb-[#C5CFF4]  scrollbar-thumb-rounded-full scrollbar-w-2 scrollbar-h-2">
      <table className="w-full divide-y divide-color-gray-200 table-fixed ">
        <div>
          <thead>
            <tr className="shadow-md border-t">
              {headerKeys.map((header, index) => (
                <th
                  key={index}
                  onClick={() => onSort(header)}
                  className="text-sm sm:text-base md:text-md font-bold text-color-header-dark-gray tracking-wider p-4 min-w-[190px]  sticky top-0 z-10 text-nowrap bg-color-dim-gray border-b "
                >
                  <div className="flex justify-center items-center">
                    {t(header)}
                    <span>{SortIconComponent(header)}</span>
                  </div>
                </th>
              ))}
              <th className="text-sm sm:text-base md:text-md font-bold text-color-header-dark-gray tracking-wider w-32 px-8  sticky top-0 bg-color-dim-gray z-10 right-0 border-b">
                {t("actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((rowItem, index) => (
              <tr key={rowItem.id}>
                {headerKeys.map((header, i) => (
                  <td key={i} className="text-sm text-color-black p-4 min-w-[190px] border-b">
                  {header === "auth_status" || header === "eKYC" || header === "auth_status_editted" ? (
                    <span className={getStatusColorClass(rowItem[header])}>
                      {rowItem[header]}
                    </span>
                  ) : header === "password_hash" ? (
                    "************" 
                  ) : header === "mandatory" || header==='mandatory_editted' ? (
                    rowItem[header] !== undefined ? (rowItem[header] ? "True" : "False") : "N/A"
                  ) : (
                    rowItem[header]
                  )}
                </td>
                
                ))}
                <td className="sticky top-0 right-0 border-b">
                  <div className="whitespace-nowrap text-sm text-color-dark-gray bg-color-white ">
                    {renderActions(rowItem, index)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </div>
      </table>
    </div>
  );
};

export default ReusableTable;
