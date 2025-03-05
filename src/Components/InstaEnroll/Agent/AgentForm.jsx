import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Select from "react-select";
import CryptoJS from "crypto-js"; // Import CryptoJS for encryption
import PasswordInput from "./PasswordInput";



const countryCodes = [
  { value: "+91", label: "+91" },
  { value: "+251", label:"+251"},
  { value: "+1", label: "+1" },
  { value: "+44", label: "+44" },
  { value: "+86", label: "+86" },
  
  

];

const AgentForm = ({ selectedAgent, onSubmit, isSubmitting }) => {
  const [agentName, setAgentName] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [selectedComId, setSelectedComId] = useState("");
  const [selectedCommissions, setSelectedCommissions] = useState([]);
  const [countryCode, setCountryCode] = useState("");

  const commissionData = useSelector(
    (store) => store?.instaEnroll?.commissionData
  );

  const navigate = useNavigate();
  const { t } = useTranslation();

  const decryptPasscode = (encryptedPasscode) => {
    const key = CryptoJS.enc.Utf8.parse("12345678901234567890123456789012"); // 32-byte key
    const iv = CryptoJS.enc.Utf8.parse("1234567890123456"); // 16-byte IV

    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: CryptoJS.enc.Hex.parse(encryptedPasscode) },
      key,
      { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );

    return decrypted.toString(CryptoJS.enc.Utf8);
  };

  useEffect(() => {
    if (selectedAgent) {
      setAgentName(selectedAgent.user_name || "");
      setPassword(decryptPasscode(selectedAgent.user_pwd) || "");
      setFirstName(selectedAgent.first_name || "");
      setLastName(selectedAgent.last_name || "");
      setMiddleName(selectedAgent.middle_name || "");
      setAddress(selectedAgent.address || "");
      setEmail(selectedAgent.email || "");
      setSelectedComId(selectedAgent.commission_id || "");
      // Extract country code and mobile number
      const mobileNumberWithCode = selectedAgent.mobile || "";
      const extractedCountryCode = countryCodes.find((code) =>
        mobileNumberWithCode.startsWith(code.value)
      )?.value;
      const extractedMobileNumber = extractedCountryCode
        ? mobileNumberWithCode.replace(extractedCountryCode, "").trim()
        : mobileNumberWithCode;
      setCountryCode(extractedCountryCode || "");
      setMobileNumber(extractedMobileNumber);
    } else {
      setAgentName("");
      setPassword("");
      setMobileNumber("");
      setFirstName("");
      setLastName("");
      setMiddleName("");
      setAddress("");
      setEmail("");
      setSelectedComId("");
      setCountryCode("");
    }
  }, [selectedAgent]);
  // Function to encrypt the password
  const encryptPasscode = (passcode) => {
    const key = CryptoJS.enc.Utf8.parse("12345678901234567890123456789012"); // 32-byte key
    const iv = CryptoJS.enc.Utf8.parse("1234567890123456"); // 16-byte IV

    const encrypted = CryptoJS.AES.encrypt(passcode, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Encrypt the password before submitting
    const encryptedPassword = encryptPasscode(password);

    const payload = {
      agent_id: selectedAgent?.agent_id,
      user_name: agentName,
      first_name: firstName,
      last_name: lastName,
      middle_name: middleName,
      agent_pwd: encryptedPassword, // Use the encrypted password
      commission_ids: selectedCommissions,
      mobile_no: `${countryCode}${mobileNumber}`,
      email_id: email,
    };

    onSubmit(payload);
  };

  const options = commissionData
    ?.filter(
      (commission) =>
        commission.commission_type && commission.process_status === 1
    )
    .map((commission) => ({
      value: commission.commission_id,
      label: commission.commission_type,
    }));

  const handleCommissionChange = (selectedOptions) => {
    setSelectedCommissions(
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  return (
    <div className="mt-4 ml-4 min-h-[80vh] mr-4">
      <h1 className="text-2xl font-bold text-gray-800 flex">
        {selectedAgent ? t("agent.edit_agent") : t("create_agent")}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="relative w-full p-6 sm:p-10 bg-white rounded-lg space-y-8 mt-5 min-h-[80vh]"
        noValidate
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-start w-full lg:w-96">
            <label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-700"
            >
              {t("first_name")}
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value.toUpperCase())}
              className="mt-1 p-3 text-gray-800 border border-blue-400 rounded-lg shadow-md focus:shadow-[3.4px_4px_0px_#0096FF] focus:border-b-4 focus:border-r-4 focus:border-blue-500 focus:outline-none w-full transition-all duration-200 ease-in-out"
              placeholder={t("first_name_placeholder")}
              required
            />
          </div>

          <div className="flex flex-col items-start w-full lg:w-96">
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700"
            >
              {t("last_name")}
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value.toUpperCase())}
              className="mt-1 p-3 text-gray-800 border border-blue-400 rounded-lg shadow-md focus:shadow-[3.4px_4px_0px_#0096FF] focus:border-b-4 focus:border-r-4 focus:border-blue-500 focus:outline-none w-full transition-all duration-200 ease-in-out"
              placeholder={t("last_name_placeholder")}
              required
            />
          </div>

          <div className="flex flex-col items-start w-full lg:w-96">
            <label
              htmlFor="middleName"
              className="text-sm font-medium text-gray-700"
            >
              {t("middle_name")}
            </label>
            <input
              type="text"
              id="middleName"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value.toUpperCase())}
              className="mt-1 p-3 text-gray-800 border border-blue-400 rounded-lg shadow-md focus:shadow-[3.4px_4px_0px_#0096FF] focus:border-b-4 focus:border-r-4 focus:border-blue-500 focus:outline-none w-full transition-all duration-200 ease-in-out"
              placeholder={t("middle_name_placeholder")}
            />
          </div>

          <div className="flex flex-col items-start w-full lg:w-96">
            <label
              htmlFor="agentName"
              className="text-sm font-medium text-gray-700"
            >
              {t("agent_name")}
            </label>
            <input
              type="text"
              id="agentName"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value.toUpperCase())}
              className="mt-1 p-3 text-gray-800 border border-blue-400 rounded-lg shadow-md focus:shadow-[3.4px_4px_0px_#0096FF] focus:border-b-4 focus:border-r-4 focus:border-blue-500 focus:outline-none w-full transition-all duration-200 ease-in-out"
              placeholder={t("agent_name_placeholder")}
              required
            />
          </div>

          <div className="flex flex-col items-start w-full lg:w-96">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              {t("password_label")}
            </label>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("password_placeholder")}
              required
            />
          </div>

          <div className="flex flex-col items-start w-full lg:w-96">
            <label
              htmlFor="mobileNumber"
              className="text-sm font-medium text-gray-700"
            >
              {t("mobile_number")}
            </label>
            <div className="relative w-full mt-2 ">
              <div className="absolute inset-y-0 left-1 flex items-center  pl-3 pr-2">
                <Select
                  options={countryCodes}
                  value={countryCodes.find(
                    (code) => code.value === countryCode
                  )}
                  onChange={(selectedOption) =>
                    setCountryCode(selectedOption.value)
                  }
                  className="w-auto"
                  classNamePrefix="select"
                />
              </div>
              <input
                type="tel"
                id="mobileNumber"
                value={`${countryCode} ${mobileNumber}`}
                onChange={(e) => {
                  const inputValue = e.target.value
                    .replace(countryCode, "")
                    .trim();
                  setMobileNumber(inputValue);
                }}
                className="pl-28  pr-3 py-3 text-gray-800 border border-blue-400 rounded-lg shadow-md focus:shadow-[3.4px_4px_0px_#0096FF] focus:border-b-4 focus:border-r-4 focus:border-blue-500 focus:outline-none w-full transition-all duration-200 ease-in-out"
                placeholder={t("mobile_number_placeholder")}
                required
              />
            </div>
          </div>

          <div className="flex flex-col items-start w-full lg:w-96">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              {t("email")}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-3 text-gray-800 border border-blue-400 rounded-lg shadow-md focus:shadow-[3.4px_4px_0px_#0096FF] focus:border-b-4 focus:border-r-4 focus:border-blue-500 focus:outline-none w-full transition-all duration-200 ease-in-out"
              placeholder={t("email_placeholder")}
              required
            />
          </div>

          <div className="flex flex-col items-start w-full lg:w-96">
            <label
              htmlFor="comType"
              className="text-sm font-medium text-gray-600"
            >
              {t("select_commission_types")}
            </label>
            <div className="relative w-full mt-1">
              <Select
                isMulti
                options={options}
                value={options.filter((option) =>
                  selectedCommissions.includes(option.value)
                )}
                onChange={handleCommissionChange}
                className="basic-multi-select mt-1 p-2 text-gray-800 border border-blue-400 rounded-lg shadow-md focus:shadow-[3.4px_4px_0px_#0096FF] focus:border-b-4 focus:border-r-4 focus:border-blue-500 focus:outline-none w-full transition-all duration-200 ease-in-out"
                classNamePrefix="select "
                placeholder="select commission"
              />
            </div>
          </div>
        </div>


        <div className="relative md:absolute  bottom-4 right-4 flex justify-end gap-4 mt-8">
          <button
            type="submit"
            className={`py-2 px-6 bg-blue-500 text-white rounded-md transition ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? t("submitting")
              : selectedAgent
              ? t("saveChanges")
              : t("submit")}
          </button>
          <button
            type="button"
            onClick={() => navigate("/body/agent/:id")}
            className="py-2 px-6 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
          >
            {t("back")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgentForm;
