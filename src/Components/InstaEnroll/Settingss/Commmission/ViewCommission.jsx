import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import KeyValueDisplay from "../KeyValue";
import { useTranslation } from "react-i18next";

const ViewCommission = () => {
  const { t } = useTranslation();
  const selectedCustomerType = useSelector(
    (store) => store.instaEnroll.commissionSelectedItem
  );
  const navigate = useNavigate();

  if (!selectedCustomerType) {
    return <div>{t("customer_no")}</div>;
  }
  return (
    <div>
      <div className="flex justify-between items-center font-roboto">
        <h2 className="flex p-5 font-bold ">{t("cutomer_detail")}</h2>
        <div className="flex justify-end p-5">
          <button
            onClick={() => navigate("/body/commission/:id")} // Navigate to the previous page
            className="bg-blue-500 text-color-white px-4 py-2 rounded"
          >
            {t("back")}
          </button>
        </div>
      </div>

      <div className="border w-[78] h-auto m-5 p-4 rounded shadow-md bg-color-white font-roboto">
        <KeyValueDisplay data={selectedCustomerType} />
      </div>
    </div>
  );
};

export default ViewCommission;
