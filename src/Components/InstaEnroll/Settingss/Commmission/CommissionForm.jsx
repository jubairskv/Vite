import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";

const CommissionForm = ({ selectedCommission, onSubmit, isSubmitting }) => {
  console.log("Edit", selectedCommission);

  const accTypeData = useSelector((store) => store.user.accTypeData);
  const cusTypeData = useSelector((store) => store.instaEnroll.cusTypeData);
  const accSubTypeData = useSelector((store) => store.instaEnroll.accSubType);

  console.log(accTypeData);
  console.log(cusTypeData);
  console.log(accSubTypeData);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const [commissionName, setCommissionName] = useState("");
  const [commissionAmount, setCommissionAmount] = useState("");
  const [selectedAccId, setSelectedAccId] = useState("");
  const [selectedCusId, setSelectedCusId] = useState("");
  const [selectedAccSubId, setSelectedAccSubId] = useState("");

  useEffect(() => {
    if (selectedCommission) {
      console.log(selectedCommission);
      setCommissionName(selectedCommission.commission_type);
      setCommissionAmount(selectedCommission.commission_amount);
      setSelectedCusId(selectedCommission.customer_type);
      setSelectedAccId(selectedCommission.account_type);
      setSelectedAccSubId(selectedCommission.account_sub_type);
    } else {
      setCommissionName("");
      setCommissionAmount("");
      setSelectedAccId("");
      setSelectedCusId("");
      setSelectedAccSubId("");
    }
  }, [selectedCommission]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      commission_id: selectedCommission?.commission_id,
      commission_type: commissionName,
      commission_amount: parseFloat(commissionAmount) || 0,
      customer_type: Number(selectedCusId),
      account_type: Number(selectedAccId),
      account_sub_type: Number(selectedAccSubId),
    };
    onSubmit(payload);
    console.log(payload);
  };

  return (
    <div className="mt-8 ml-4 min-h-[80vh] mr-4 flex flex-col items-start">
      <h1 className="text-2xl font-bold text-gray-800 flex">
        {selectedCommission
          ? t("setting.edit_commssion_type")
          : t("setting.create_commission_type")}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="relative w-full  bg-white rounded-lg space-y-8 mt-5 min-h-[80vh]"
        noValidate
      >
        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Type Name */}
          <div className="flex flex-col items-start">
            <label
              htmlFor="commissionType"
              className="text-sm font-medium text-gray-700"
            >
              {t("commission_name")}
            </label>
            <input
              type="text"
              id="commissionType"
              value={commissionName}
              onChange={(e) => setCommissionName(e.target.value.toUpperCase())}
              className="mt-1 p-3 text-gray-800 border border-blue-400 rounded-lg shadow-md focus:shadow-[3.4px_4px_0px_#0096FF] focus:border-b-4 focus:border-r-4 focus:border-blue-500 focus:outline-none w-80 transition-all duration-200 ease-in-out appearance-none"
              placeholder={t("commission_place")}
              required
            />
          </div>

          {/* Customer Type */}
          <div className="flex flex-col items-start relative">
            <label
              htmlFor="custType"
              className="text-sm font-medium text-gray-600"
            >
              {t("select_customer_type")}
            </label>
            <div className="relative w-80 mt-1">
              <select
                id="custType"
                value={selectedCusId}
                onChange={(e) => setSelectedCusId(e.target.value)}
                className="mt-1 p-3 text-gray-800 border border-blue-400 rounded-lg shadow-md focus:shadow-[3.4px_4px_0px_#0096FF] focus:border-b-4 focus:border-r-4 focus:border-blue-500 focus:outline-none w-80 transition-all duration-200 ease-in-out appearance-none"
              >
                <option value="" disabled>
                  {t("customer_place")}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Type */}
          <div className="flex flex-col items-start relative">
            <label
              htmlFor="accountType"
              className="text-sm font-medium text-gray-600"
            >
              {t("select_account_type")}
            </label>
            <div className="relative w-80 mt-1">
              <select
                id="accountType"
                value={selectedAccId}
                onChange={(e) => setSelectedAccId(e.target.value)}
                className="mt-1 p-3 text-gray-800 border border-blue-400 rounded-lg shadow-md focus:shadow-[3.4px_4px_0px_#0096FF] focus:border-b-4 focus:border-r-4 focus:border-blue-500 focus:outline-none w-80 transition-all duration-200 ease-in-out appearance-none"
              >
                <option value="" disabled className="hover:blue">
                  {t("account_place")}
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

          {/* Account Sub Type */}
          <div className="flex flex-col items-start relative">
            <label
              htmlFor="AccSubType"
              className="text-sm font-medium text-gray-600"
            >
              {t("select_account_sub_type")}
            </label>
            <div className="relative w-80 mt-1">
              <select
                id="custType"
                value={selectedAccSubId}
                onChange={(e) => setSelectedAccSubId(e.target.value)}
                className="mt-1 p-3 text-gray-800 border border-blue-400 rounded-lg shadow-md focus:shadow-[3.4px_4px_0px_#0096FF] focus:border-b-4 focus:border-r-4 focus:border-blue-500 focus:outline-none w-80 transition-all duration-200 ease-in-out appearance-none"
              >
                <option value="" disabled>
                  {t("accountsub_type")}
                </option>
                {accSubTypeData
                  ?.filter(
                    (accSub) =>
                      accSub.sub_type_name && accSub?.process_status === 1
                  )
                  ?.map((accSub) => (
                    <option key={accSub.id} value={accSub.id}>
                      {accSub.sub_type_name}
                    </option>
                  ))}
              </select>
              <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <FaChevronDown className="text-gray-600" />
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-600"
            >
              {t("commission_amount")}
            </label>
            <input
              type="number"
              id="commission_amount"
              value={commissionAmount}
              onChange={(e) => setCommissionAmount(e.target.value)}
              className="mt-1 p-3 text-gray-800 border border-blue-400 rounded-lg shadow-md focus:shadow-[3.4px_4px_0px_#0096FF] focus:border-b-4 focus:border-r-4 focus:border-blue-500 focus:outline-none w-80 transition-all duration-200 ease-in-out appearance-none"
              placeholder={t("commission_amount_placeholder")}
              required
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="absolute bottom-4 right-4 space-x-4 mt-7">
          <button
            type="submit"
            className={`py-2 px-6 bg-blue-500 text-white rounded-md transition ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600 "
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? t("submitting")
              : selectedCommission
              ? t("saveChanges")
              : t("submit")}
          </button>

          <button
            type="button"
            onClick={() => navigate("/body/commission/:id")}
            className="mt-4 sm:mt-0 py-2 px-6 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
          >
            {t("back")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommissionForm;
