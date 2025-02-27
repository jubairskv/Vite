import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import KeyValueDisplay from "../Settingss/KeyValue";
import { useTranslation } from "react-i18next";

const ViewCustomers = () => {
  const { t } = useTranslation();
  const selectedCustomers = useSelector(
    (store) => store.instaEnroll.customerSelectedItem
  );
  const selectedMenu = useSelector((store) => store.menu.selectedMenuItem);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("accout_satus");
  const [modalImage, setModalImage] = useState(null);

  if (!selectedCustomers) {
    return (
      <div className="font-roboto">No account sub-type data available.</div>
    );
  }

  const tabs = [
    { key: "accout_satus", label: "Account Details" },
    { key: "image_data", label: "Image Data" },
    { key: "genkyc_status", label: "Gen KYC Status" },
    { key: "occupation_status", label: "Occupation Details" },
    { key: "address_status", label: "Address Details" },
    { key: "pep_status", label: "PEP Details" },
    { key: "guardian_status", label: "Guardian Details" },
    { key: "business_address_status", label: "Business Address" },
    { key: "business_detail_status", label: "Business Detail" },
    { key: "mode_of_operation_status", label: "Mode of Operation" },
  ];

  // Filter tabs where data exists in selectedCustomers
  const visibleTabs = tabs.filter(
    (tab) =>
      selectedCustomers[tab.key] !== null &&
      selectedCustomers[tab.key] !== undefined
  );

  const renderTabContent = () => {
    const tabData = selectedCustomers[activeTab];
    if (!tabData) {
      return (
        <div className="relative top-40">
          No data available for this section.
        </div>
      );
    }
    const excludedKeys = [
      "created_time",
      "updated_time",
      "id",
      "process_status",
      "auth_status",
      "created_userid",
      "auth_time",
      "auth_userid",
      "deauth_narration",
      "audit_note",
      "user_id",
      "updated_userid",
      "ID",
      "UserID",
      "CreatedTime",
      "UpdatedTime",
      "acct_type",
      "acct_sub_type",
    ];

    const filteredTabData = Object.entries(tabData).filter(
      ([key]) => !excludedKeys.includes(key)
    );

    if (activeTab === "image_data") {
      return (
        <div className="flex flex-wrap gap-4 sm:flex-row justify-around">
          {Object.entries(tabData)
            .map(([key, value]) => (
              <div
                key={key}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => setModalImage(value)}
              >
                <img
                  src={value}
                  alt={key}
                  className="w-auto h-40 border-2 border-gray-300 p-1  bg-gray-50  rounded-lg shadow-md  object-contain hover:scale-105  transition-transform"
                />
                <p className="font-medium text-center mt-2">{t(key)}</p>
              </div>
            ))}
        </div>
      );
    }

    return <KeyValueDisplay data={Object.fromEntries(filteredTabData)} />;
  };

  return (
    <div className="overflow-hidden">
      <div className="flex justify-between items-center font-roboto">
        <h2 className="flex p-5 font-bold">{selectedMenu?.menu_name}</h2>
        <div className="flex justify-end p-5">
          <button
            onClick={() => navigate("/body/customer/:id")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Back
          </button>
        </div>
      </div>

      <div className="border-t-2 border-b-2 w-[97%] h-[560px] scrollbar overflow-auto scrollbar-thumb-[#c5cff4] scrollbar-thumb-rounded-full scrollbar-w-1 mx-6 rounded shadow-md font-roboto bg-color-white">
        {/* Tabs */}
        <div className=" mb-4">
          <ul className="flex overflow-x-auto shadow-md">
            {visibleTabs.map((tab) => (
              <li
                key={tab.key}
                className={`cursor-pointer px-4 py-2 ${
                  activeTab === tab.key
                    ? "border-b-4 border-blue-500 font-bold bg-[#f1f1f5]"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Tab Content */}
        <div className=" w-full h-full p-2">
          {renderTabContent()}
        </div>
      </div>

      {/* Modal */}
      {modalImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-lg shadow-lg">
            <img
              src={modalImage}
              alt="Popup"
              className="w-auto max-h-96 object-contain rounded-md"
            />
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCustomers;
