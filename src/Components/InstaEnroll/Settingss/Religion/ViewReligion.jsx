import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import KeyValueDisplay from "../KeyValue";
import { useTranslation } from "react-i18next";

const ViewReligion = () => {
  const {t}=useTranslation();
  const selectedReligion = useSelector(
    (store) => store.instaEnroll.religionSelectedItem
  );
  const navigate = useNavigate();

  if (!selectedReligion) {
    return <div>{t("religion_no")}</div>;
  }

  return (
    <div className=" w-[78] h-[42rem]  overflow-y-auto scrollbar scrollbar-thumb-scrollbar-color-gray  scrollbar-thumb-rounded-full scrollbar-w-2 ">
      <div className="flex justify-between items-center">
        <h2 className="flex p-5 font-bold">{t("religion_detail")}</h2>
        <div className="flex justify-end p-5">
          <button
            onClick={() => navigate("/body/religion/:id")} // Navigate to the previous page
            className="bg-blue-500 text-color-white px-4 py-2 rounded"
          >
            {t("back")}
          </button>
        </div>
      </div>

      <div className="border w-[78] h-auto mx-5 p-4 rounded shadow-md bg-color-white">
        <KeyValueDisplay data={selectedReligion} />
      </div>
    </div>
  );
};

export default ViewReligion;
