import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ACCOUNT_SUB_TYPE_DELETE_AUTH,
  ACCOUNT_SUB_TYPE_DELETE,
} from "../../../../Utils/Constant";
import useDelete from "../../../../Hooks/InstaEnroll/useDelete";
import KeyValueDisplay from "../KeyValue";
import { useTranslation } from "react-i18next";

const DeleteAccountSubType = () => {
  const {t}=useTranslation();
  const [feedbackSub, setFeedbackSub] = useState("");

  const user = useSelector((store) => store?.user?.items);
  const userId = user?.map((items) => items.user_id);

  const navigate = useNavigate();

  
  const selectedAccountsubType = useSelector(
    (state) => state.instaEnroll.accSubTypeSelectedItem
  );

  const { handleDelete, isDeleting } = useDelete(
    ACCOUNT_SUB_TYPE_DELETE,
    ACCOUNT_SUB_TYPE_DELETE_AUTH
  );

  const handleDeleteClick = () => {
    const payload = {
      acctsubtype_id: selectedAccountsubType.id,
      del_narration: feedbackSub,
    };

    handleDelete(
      payload,
      userId,
      selectedAccountsubType,
      "/body/accountsubtype/:id"
    );
  };

  if (!selectedAccountsubType) {
    return <div>{t("no_data")}</div>;
  }

  return (
    <div className="px-5 pt-2 font-roboto  w-[78] h-[43rem] overflow-y-auto scrollbar scrollbar-thumb-scrollbar-color-gray scrollbar-thumb-rounded-full scrollbar-w-2">
      <h2 className="text-lg font-bold mb-2 flex ">{t("confirm")}</h2>
      <div className="border mb-1 p-4 rounded-md shadow-md bg-color-white">
        <KeyValueDisplay data={selectedAccountsubType} />
      </div>

      <div className="mb-4 flex flex-col">
        <label
          htmlFor="feedback"
          className="text-sm font-medium  flex py-2 text-color-black"
        >
          {t("reason")}
        </label>
        <textarea
          id="feedback"
          rows="4"
          className="mt-1 block w-full h-[75px] p-2 border rounded-md shadow-md outline-none"
          placeholder={t("delete_placeholder")}
          value={feedbackSub}
          onChange={(e) => setFeedbackSub(e.target.value)}
        ></textarea>
      </div>

      {/* Buttons */}
      <div className=" bottom-5 left-auto right-0 flex justify-end gap-0 px-4">
        <button
          onClick={handleDeleteClick}
          className="bg-color-red text-color-white px-4 py-2 rounded mr-4"
          disabled={isDeleting}
        >
          {isDeleting ? t("deleting") : t("confirm")}
        </button>
        <button
          onClick={() => navigate("/body/accountsubtype/:id")}
          className="bg-color-dark-gray text-color-white px-4 py-2 rounded"
        >
          {t("cancel")}
        </button>
      </div>
    </div>
  );
};

export default DeleteAccountSubType;
