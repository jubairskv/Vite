import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa";

const AccountSubTypeForm = ({ selectedAccountSub, onSubmit, isSubmitting }) => {
  const [accountSubName, setAccountSubName] = useState("");
  const [selectedAccId, setSelectedAccId] = useState("");
  const [selectedCusId, setSelectedCusId] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const accTypeData = useSelector((store) => store.user.accTypeData);
  const cusTypeData = useSelector((store) => store.instaEnroll.cusTypeData);

  useEffect(() => {
    if (selectedAccountSub) {
      setAccountSubName(selectedAccountSub.sub_type_name);
      setDescription(selectedAccountSub.description);
      setSelectedAccId(selectedAccountSub.acct_type_id);
      setSelectedCusId(selectedAccountSub.cust_type_id);
    } else {
      setAccountSubName("");
      setDescription("");
      setSelectedAccId("");
      setSelectedCusId("");
    }
  }, [selectedAccountSub]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      acctsubtype_name: accountSubName,
      description: description,
      accttype_id: Number(selectedAccId),
      custtype_id: Number(selectedCusId),
      id: selectedAccountSub?.id,
    };
    if (typeof onSubmit === "function") {
      onSubmit(payload);
    }
  };

  return (
    <div className="mt-4 ml-4 min-h-[80vh] mr-4 flex flex-col items-start">
      <h1 className="text-2xl font-bold text-gray-800 flex mb-4">
        {selectedAccountSub
          ? t("setting.edit_account_subtype")
          : t("setting.create_account_subtype")}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="relative w-full  bg-white rounded-lg space-y-8 mt-5 min-h-[80vh]"
        noValidate
      >
        {/* Input Fields */}
        <div className="flex flex-col sm:flex-row gap-8 justify-stretch">
          {/* Account Sub-Type Name */}
          <div className="flex flex-col items-start w-full lg:w-96">
            <label
              htmlFor="accountSubName"
              className="text-sm font-medium text-gray-700 mb-2"
            >
              {t("account_subtype")}
            </label>
            <input
              type="text"
              id="accountSubName"
              value={accountSubName}
              onChange={(e) => setAccountSubName(e.target.value.toUpperCase())}
              className="p-3 text-gray-800 border border-blue-400 rounded-lg shadow-md focus:shadow-[3.4px_4px_0px_#0096FF] focus:border-b-4 focus:border-r-4 focus:border-blue-500 focus:outline-none w-full"
              placeholder={t("account_placeholder_text")}
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col items-start w-full lg:w-96">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-600 mb-2"
            >
              {t("description")}
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value.toUpperCase())}
              className="p-3 text-gray-800 border border-blue-400 rounded-lg shadow-md focus:shadow-[3.4px_4px_0px_#0096FF] focus:border-b-4 focus:border-r-4 focus:border-blue-500 focus:outline-none w-full"
              placeholder={t("description_placeholder_text")}
              required
            />
          </div>
        </div>

        {/* Dropdown Fields */}
        <div className="flex flex-col sm:flex-row gap-8 w-full justify-stretch">
          {/* Account Type */}
          <div className="flex flex-col items-start w-full lg:w-96">
            <label
              htmlFor="accountType"
              className="text-sm font-medium text-gray-600 mb-2"
            >
              {t("select_account_type")}
            </label>
            <div className="relative w-full">
              <select
                id="accountType"
                value={selectedAccId}
                onChange={(e) => setSelectedAccId(e.target.value)}
                className="p-3 text-gray-800 border border-blue-400 rounded-lg shadow-md focus:shadow-[3.4px_4px_0px_#0096FF] focus:border-b-4 focus:border-r-4 focus:border-blue-500 focus:outline-none w-full appearance-none"
              >
                <option value="" disabled>
                  {t("select_type_placeholder")}
                </option>
                {accTypeData
                  ?.filter(
                    (account) =>
                      account?.acct_name && account?.process_status === 1
                  )
                  ?.map((account) => (
                    <option key={account?.id} value={account?.id}>
                      {account?.acct_name}
                    </option>
                  ))}
              </select>
              <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <FaChevronDown className="text-gray-600" />
              </span>
            </div>
          </div>

          {/* Customer Type */}
          <div className="flex flex-col items-start w-full lg:w-96 ">
            <label
              htmlFor="custType"
              className="text-sm font-medium text-gray-600 mb-2"
            >
              {t("select_customer_type")}
            </label>
            <div className="relative w-full">
              <select
                id="custType"
                value={selectedCusId}
                onChange={(e) => setSelectedCusId(e.target.value)}
                className="p-3 text-gray-800 border border-blue-400 rounded-lg shadow-md focus:shadow-[3.4px_4px_0px_#0096FF] focus:border-b-4 focus:border-r-4 focus:border-blue-500 focus:outline-none w-full appearance-none"
              >
                <option value="" disabled>
                  {t("select_type_placeholder")}
                </option>
                {cusTypeData
                  ?.filter(
                    (cust) => cust.type_name && cust?.process_status === 1
                  )
                  ?.map((cust) => (
                    <option key={cust.id} value={cust.id}>
                      {cust.type_name}
                    </option>
                  ))}
              </select>
              <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <FaChevronDown className="text-gray-600" />
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="relative md:absolute  bottom-4 right-4 flex justify-end gap-4 mt-8">
          <button
            type="submit"
            className={`py-2 px-6 bg-blue-500 text-white rounded-md transition-all ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? t("submitting")
              : selectedAccountSub
              ? t("saveChanges")
              : t("submit")}
          </button>

          <button
            type="button"
            onClick={() => navigate("/body/accountsubtype/:id")}
            className="py-2 px-6 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
          >
            {t("back")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSubTypeForm;
