import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import KeyValueDisplay from "../KeyValue";
import { useTranslation } from "react-i18next";

const ViewAccountSubType = () => {
  const {t}=useTranslation();
  const selectedAccountsubType = useSelector(
    (state) => state.instaEnroll.accSubTypeSelectedItem
  );
  const selectedMenu = useSelector((store) => store.menu.selectedMenuItem);

  const navigate = useNavigate();

  if (!selectedAccountsubType) {
    return (
      <div className="font-roboto">{t("nodata")}</div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center font-roboto">
        <h2 className="flex p-5 font-bold">{t(selectedMenu?.menu_name)}</h2>
        <div className="flex justify-end p-5">
          <button
            onClick={() => navigate("/body/accountsubtype/:id")}
            className="bg-blue-500 text-color-white px-4 py-2 rounded"
          >
            {t("back")}
          </button>
        </div>
      </div>

      <div className="border w-[78] h-auto mx-5 p-4 rounded shadow-md font-roboto bg-color-white">
        <KeyValueDisplay data={selectedAccountsubType} />
      </div>
    </div>
  );
};

export default ViewAccountSubType;
