import React from "react";
import { IoIosSearch } from "react-icons/io";

const SearchBar = ({ placeholder, searchQuery, onSearchChange }) => {
  return (
    <div className="relative flex items-center w-full">
      <IoIosSearch className="absolute left-2 text-color-dark-gray" />
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="outline-none border-b-2 p-2 pl-10 w-full"
      />
    </div>
  );
};

export default SearchBar;
