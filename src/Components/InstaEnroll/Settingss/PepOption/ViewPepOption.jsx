import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import KeyValueDisplay from "../KeyValue";
import { useTranslation } from "react-i18next";

const ViewPepOption = () => {
  const {t}=useTranslation();
  const selectedPepOption = useSelector(
    (store) => store.instaEnroll.pepOptionSelectedItem
  );
  const navigate = useNavigate();

  //const token = useSelector(store => store.token.token)

  if (!selectedPepOption) {
    return <div>{t("pep_no")}</div>;
  }

  return (
    <div className=" w-[78] h-[42rem]  overflow-y-auto scrollbar scrollbar-thumb-scrollbar-color-gray  scrollbar-thumb-rounded-full scrollbar-w-2 ">
      <div className="flex justify-between items-center">
        <h2 className="flex p-5 font-bold">{t("pep_detail")}</h2>
        <div className="flex justify-end p-5">
          <button
            onClick={() => navigate("/body/pepoption/:id")} // Navigate to the previous page
            className="bg-blue-500 text-color-white px-4 py-2 rounded"
          >
            {t("back")}
          </button>
        </div>
      </div>

      <div className="border w-[78] h-auto mx-5 p-4 rounded shadow-md bg-color-white">
        <KeyValueDisplay data={selectedPepOption} />
      </div>
      {/* Back Button */}
    </div>
  );
};

export default ViewPepOption;
