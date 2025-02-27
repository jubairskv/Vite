import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import KeyValueDisplay from "../KeyValue";
import { useTranslation } from "react-i18next";

const ViewCategory = () => {
  const {t}=useTranslation();
  const selectedCategory = useSelector(
    (store) => store.instaEnroll.categorySelectedItem
  );
  const navigate = useNavigate();
  console.log("categorydata", selectedCategory);

  if (!selectedCategory) {
    return <div>{t("category_no")}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="flex p-5 font-bold">{t("category_detail")}</h2>
        <div className="flex justify-end p-5">
          <button
            onClick={() => navigate("/body/category/:id")}
            className="bg-blue-500 text-color-white px-4 py-2 rounded"
          >
            {t("back")}
          </button>
        </div>
      </div>

      <div className="border w-[78] h-auto mx-5 p-4 rounded shadow-md bg-color-white">
        <KeyValueDisplay data={selectedCategory} />
      </div>
    </div>
  );
};

export default ViewCategory;
