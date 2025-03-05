import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import KeyValueDisplay from "../KeyValue";
import { useTranslation } from "react-i18next";

const ViewAccountType = () => {
  const {t}=useTranslation();
  const selectedAddressProof = useSelector(
    (store) => store.instaEnroll.addProofSelectedItem
  );
  const navigate = useNavigate();

  if (!selectedAddressProof) {
    return <div>{t("accountt_no")}</div>;
  }

  return (
    <div className=" w-[78] h-[42rem]  overflow-y-auto scrollbar scrollbar-thumb-scrollbar-color-gray  scrollbar-thumb-rounded-full scrollbar-w-2 ">
      <div className="flex justify-between items-center">
        <h2 className="flex p-5 font-bold">{t("accountt_detail")}</h2>
        <div className="flex justify-end p-5">
          <button
            onClick={() => navigate("/body/proofofaddress/:id")} // Navigate to the previous page
            className="bg-blue-500 text-color-white px-4 py-2 rounded"
          >
            {t("back")}
          </button>
        </div>
      </div>

      <div className="border w-[78] h-auto mx-5 p-4 rounded shadow-md bg-color-white">
        <KeyValueDisplay data={selectedAddressProof} />
      </div>
    </div>
  );
};

export default ViewAccountType;
