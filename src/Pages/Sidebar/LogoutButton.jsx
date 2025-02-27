import React from "react";
import { FiLogOut } from "react-icons/fi";

const LogoutButton = ({ handleLogout }) => {
  return (
    <div className="flex items-center justify-center overflow-hidden">
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 border bg-blue-100 shadow-lg hover:bg-blue-400 text-color-black font-roboto font-bold py-1 px-3 rounded  transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none  mb-3"
      >
        <FiLogOut className="text-xl" />
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
