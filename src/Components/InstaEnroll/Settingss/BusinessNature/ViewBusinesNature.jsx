import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import KeyValueDisplay from "../KeyValue";
import { useTranslation } from "react-i18next";

const ViewBusinessNature = () => {
  const {t}=useTranslation();
  const selectedBusinessNature = useSelector(
    (store) => store.instaEnroll.businessNatureSelectedItem
  );
  const navigate = useNavigate();

  if (!selectedBusinessNature) {
    return <div>{t("business_no")}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="flex p-5 font-bold">{t("business_detail")}</h2>
        <div className="flex justify-end p-5">
          <button
            onClick={() => navigate("/body/businessnature/:id")}
            className="bg-blue-500 text-color-white px-4 py-2 rounded"
          >
            {t("back")}
          </button>
        </div>
      </div>

      <div className="border w-[78] h-auto mx-5 p-4 rounded shadow-md bg-color-white">
        <KeyValueDisplay data={selectedBusinessNature} />
      </div>
    </div>
  );
};

export default ViewBusinessNature;
