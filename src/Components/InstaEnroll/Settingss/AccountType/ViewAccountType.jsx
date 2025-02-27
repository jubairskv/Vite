import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import KeyValueDisplay from "../KeyValue";
import { useTranslation } from "react-i18next";

const ViewAccountType = () => {
  const {t}=useTranslation();
  const selectedAccount = useSelector(
    (store) => store.instaEnroll.accTypeSelectedItem
  );

  const navigate = useNavigate();

  if (!selectedAccount) {
    return <div>{t("accountno")}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="flex p-5 font-bold">{t("account_detail")}</h2>
        <div className="flex justify-end p-5">
          <button
            onClick={() => navigate("/body/accounttype/:id")}
            className="bg-blue-500 text-color-white px-4 py-2 rounded"
          >
            {t("back")}
          </button>
        </div>
      </div>

      <div className="border w-[78] h-auto mx-5 p-4 rounded shadow-md bg-color-white">
        <KeyValueDisplay data={selectedAccount} />
      </div>
    </div>
  );
};

export default ViewAccountType;
