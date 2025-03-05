import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import KeyValueDisplayEpurse from "../KeyValue";

const ViewLeads = () => {
  const selectedCustomers = useSelector(
    (store) => store.epurse.customersSelectedItem
  );
  console.log(selectedCustomers);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("accountDetails");

  if (!selectedCustomers) {
    return <div>No account data available.</div>;
  }

  // Define the sections for each tab
  const renderContent = () => {
    // Filter out specific fields for the Account Details tab
    const filteredAccountDetails = { ...selectedCustomers };
    delete filteredAccountDetails.user_gen_kyc_data;
    delete filteredAccountDetails.user_address;
    delete filteredAccountDetails.user_occupation;
    delete filteredAccountDetails.user_pep_rel;

    switch (activeTab) {
      case "accountDetails":
        return <KeyValueDisplayEpurse data={filteredAccountDetails} />;

      case "userKYC":
        return (
          <KeyValueDisplayEpurse
            data={selectedCustomers.user_gen_kyc_data || {}}
          />
        );

      case "useraddress":
        return (
          <KeyValueDisplayEpurse data={selectedCustomers.user_address || {}} />
        );

      case "useroccupation":
        return (
          <KeyValueDisplayEpurse
            data={selectedCustomers.user_occupation || {}}
          />
        );
      case "userpeprel":
        return (
          <KeyValueDisplayEpurse data={selectedCustomers.user_pep_rel || {}} />
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="flex p-5 font-bold">Customers Details :</h2>
        <div className="flex justify-end p-5">
          <button
            onClick={() => navigate("/body/customers")}
            className="bg-gradient-to-br from-[#3d78b6] to-[#20205f] text-color-white px-4 py-2 rounded"
          >
            Back
          </button>
        </div>
      </div>

      <div className="border w-[78] h-[35rem]   mx-5 p-4 rounded shadow-md bg-color-white">
        {/* Tab Buttons */}
        <div className="flex border-b mb-4 sticky top-0 z-10">
          <button
            onClick={() => setActiveTab("accountDetails")}
            className={`px-4 py-2 text-sm font-semibold ${
              activeTab === "accountDetails"
                ? "border-b-2 border-blue-500"
                : "text-color-dark-gray"
            }`}
          >
            Account Details
          </button>
          <button
            onClick={() => setActiveTab("userKYC")}
            className={`px-4 py-2 text-sm font-semibold ${
              activeTab === "userKYC"
                ? "border-b-2 border-blue-500"
                : "text-color-dark-gray"
            }`}
          >
            User KYC Data
          </button>
          <button
            onClick={() => setActiveTab("useraddress")}
            className={`px-4 py-2 text-sm font-semibold ${
              activeTab === "useraddress"
                ? "border-b-2 border-blue-500"
                : "text-color-dark-gray"
            }`}
          >
            User Address
          </button>
          <button
            onClick={() => setActiveTab("useroccupation")}
            className={`px-4 py-2 text-sm font-semibold ${
              activeTab === "useroccupation"
                ? "border-b-2 border-blue-500"
                : "text-color-dark-gray"
            }`}
          >
            User Occupation
          </button>
          <button
            onClick={() => setActiveTab("userpeprel")}
            className={`px-4 py-2 text-sm font-semibold ${
              activeTab === "userpeprel"
                ? "border-b-2 border-blue-500"
                : "text-color-dark-gray"
            }`}
          >
            User PEP Rel
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 overflow-y-auto h-[28rem] z-0 scrollbar scrollbar-thumb-scrollbar-color-gray  scrollbar-thumb-rounded-full scrollbar-w-2">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ViewLeads;
