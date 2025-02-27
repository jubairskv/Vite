// hooks/useSortIcon.js
import { FaSortUp, FaSortDown } from "react-icons/fa";

const useSortIcon = (sortColumn, sortOrder, column) => {
  const isActive = sortColumn === column;
  const activeColor = "text-blue-500";
  const inactiveColor = "text-gray-400";

  const SortIcon = () => (
    <div className="flex items-center space-x-[-1.0rem]">
      <FaSortUp
        className={`${isActive && sortOrder === "asc" ? activeColor : inactiveColor}`}
      />
      <FaSortDown
        className={`${isActive && sortOrder === "desc" ? activeColor : inactiveColor}`}
      />
    </div>
  );

  return SortIcon;
};

export default useSortIcon;
