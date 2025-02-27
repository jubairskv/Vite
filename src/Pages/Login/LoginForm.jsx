import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { BiSolidLock } from "react-icons/bi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LanguageDropdown from "../../Components/LanguageDropdown ";


const LoginForm = ({ onSubmit, errors }) => {
  const savedUserName = localStorage.getItem("userName");
  const savedPassword = localStorage.getItem("password");
  const [userName, setUserName] = useState(savedUserName || "");
  const [isOpen, setIsopen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(!!savedUserName);
  const { t, i18n } = useTranslation();

  const toggleLanguageDropdown = () => {
    setActiveDropdown((prev) => (prev === "language" ? null : "language"));
  };

  useEffect(() => {
    if (savedUserName) {
      setUserName(savedUserName);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, [savedUserName, savedPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rememberMe) {
      localStorage.setItem("userName", userName);
      localStorage.setItem("password", password);
    } else {
      localStorage.removeItem("userName");
      localStorage.removeItem("password");
    }
    onSubmit({ userName, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLanguageChange = (value) => {
    i18n.changeLanguage(value);
    setIsopen(false);
  };

  return (
    <div>
      <div className="absolute top-2 left-0 font-roboto  border-gray-300 text-nowrap w-36 rounded-md">
        <button className="z-50 w-32" onClick={toggleLanguageDropdown}>
          <LanguageDropdown />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="pt-16 font-roboto text-nowrap">
        <div className="flex flex-col pt-4">
          <label className="pr-[88%] font-roboto font-medium text-base">
            {t("user_id_label")}
            <span className="text-color-red">{t("required_field")}</span>
          </label>
          <div className="relative w-full h-12 lg:w-96 sm:w-auto">
            <input
              type="text"
              placeholder={t("user_placeholder")}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="border rounded w-full h-full pl-10 pr-4 py-2 mt-2 outline-none"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-color-header-dark-gray mt-2">
              <FaUser size={15} />
            </div>
          </div>
          {errors.userName && (
            <p className="text-color-red text-sm mt-2">{t(`userName_error`)}</p>
          )}
        </div>

        <div className="flex flex-col pt-4">
          <label className="pr-[88%] font-medium text-base">
            {t("password_label")}
            <span className="text-color-red">{t("required_field")}</span>
          </label>
          <div className="relative w-full h-12 lg:w-96 sm:w-auto">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t("password_placeholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded w-full h-full pl-10 pr-10 py-2 mt-2 outline-none"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-color-dark-gray mt-2">
              <BiSolidLock size={20} />
            </div>
            <div
              className="absolute right-5 top-1/2 transform mt-2 -translate-y-1/2 text-color-dark-gray cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FiEye size={15} /> : <FiEyeOff size={15} />}
            </div>
          </div>
          {errors.password && (
            <p className="text-color-red text-sm mt-2">{t(`password_error`)}</p>
          )}
        </div>

        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="rememberMe" className="text-sm">
            {t("remember_me")}
          </label>
        </div>

        <div className="mt-2 text-sm text-color-blue cursor-pointer">
          <Link to="/forgotpassword">{t("forgot_password")}</Link>
        </div>

        <div className="mt-8 flex">
          <button
            type="submit"
            className="border bg-gradient-to-br from-[#3d78b6] to-[#20205f]  rounded shadow-lg w-full lg:w-96 h-12 text-color-white"
          >
            {t("login_button")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
