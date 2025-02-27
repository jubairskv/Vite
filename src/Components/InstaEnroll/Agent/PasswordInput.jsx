import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const PasswordInput = ({ value, onChange, placeholder, required }) => {
  const [showPassword, setShowPassword] = useState(false); 

  return (
    <div className="relative w-full">
      <input
        type={showPassword ? "text" : "password"} 
        id="password"
        value={value}
        onChange={onChange}
        className="mt-1 p-3 text-gray-800 border border-blue-400 rounded-lg shadow-md focus:shadow-[3.4px_4px_0px_#0096FF] focus:border-b-4 focus:border-r-4 focus:border-blue-500 focus:outline-none w-full transition-all duration-200 ease-in-out"
        placeholder={placeholder}
        required={required}
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)} 
        className="absolute z-50 bg-white inset-y-3 p-2 right-2 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
      >
    
        {showPassword ? <FaEyeSlash /> : <FaEye />} 
      </button>
    </div>
  );
};

export default PasswordInput;