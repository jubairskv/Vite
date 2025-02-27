import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import KeyValueDisplay from "../KeyValue";
import { useTranslation } from "react-i18next";

const ViewModeOfOperation = () => {
  const {t}=useTranslation();
  const selectedModeOfOperation = useSelector(
    (store) => store.instaEnroll.modeOfOperationSelectedItem
  );

  const navigate = useNavigate();

  if (!selectedModeOfOperation) {
    return <div>{t("mode_no")}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="flex p-5 font-bold">{t("mode_detail")}</h2>
        <div className="flex justify-end p-5">
          <button
            onClick={() => navigate("/body/modeofoperation/:id")}
            className="bg-blue-500 text-color-white px-4 py-2 rounded"
          >
            {t("back")}
          </button>
        </div>
      </div>

      <div className="border w-[78] h-auto mx-5 p-4 rounded shadow-md bg-color-white">
        <KeyValueDisplay data={selectedModeOfOperation} />
      </div>
    </div>
  );
};

export default ViewModeOfOperation;
