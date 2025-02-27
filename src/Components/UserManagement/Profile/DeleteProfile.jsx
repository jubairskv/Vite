import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PROFILE_DELETE, PROFILE_DELETE_AUTH } from "../../../Utils/Constant";
import useDelete from "../../../Hooks/InstaEnroll/useDelete";
import KeyValueDisplay from "../KeyValue";
import ViewTree from "./ViewPage/ViewTreeStrcture";
import { useTranslation } from "react-i18next";

const DeleteProfile = () => {
  const { t } = useTranslation();
  const selectedProfile = useSelector(
    (store) => store?.instaEnroll?.accTypeSelectedItem
  );

  const navigate = useNavigate();

  const [feedback, setFeedback] = useState("");

  const user = useSelector((store) => store?.user?.items);
  const userId = user?.map((items) => items.user_id);

  const { handleDelete, isDeleting } = useDelete(
    PROFILE_DELETE,
    PROFILE_DELETE_AUTH
  );

  const handleDeleteClick = () => {
    const payload = {
      profile_id: selectedProfile.profile_id,
      inst_id: selectedProfile.inst_id,
      del_narration: feedback,
    };

    handleDelete(payload, userId, selectedProfile, "/body/profile");
  };

  if (!selectedProfile) {
    return <div>No profile data available for deletion.</div>;
  }

  return (
    <div>
      <div className=" w-[78] h-[42rem]  overflow-y-auto scrollbar scrollbar-thumb-scrollbar-color-gray  scrollbar-thumb-rounded-full scrollbar-w-2 ">
        <h2 className="text-xl font-bold mb-4 flex px-5 p-2">
          {t("confirm_delete")}
        </h2>

        {/* Render account details */}
        <div className="border w-[78] h-[26rem]  mx-5 p-2 rounded-md shadow-md bg-color-white font-roboto text-md">
          <KeyValueDisplay
            data={selectedProfile}
            excludeKeys={["menu_actions"]}
          />
        </div>

        <div className="mt-6">
          <ViewTree selectedmenu={selectedProfile} isEditable={true} />
        </div>

        <div className="mb-4 p-6">
          <label
            htmlFor="feedback"
            className="flex text-sm font-medium text-color-black"
          >
            {t("why_are_you_deleting_this_account?")}
          </label>
          <textarea
            id="feedback"
            rows="4"
            className="mt-1 block w-full p-2 border rounded-md shadow-md outline-none"
            placeholder="Provide a reason for deletion (e.g., incorrect data, no longer needed)"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex justify-end p-6">
          <button
            onClick={handleDeleteClick}
            className="bg-color-red text-color-white px-4 py-2 rounded mr-4"
            disabled={isDeleting}
          >
            {isDeleting ? t("deleting...") : t("confirm_delete")}
          </button>
          <button
            onClick={() => navigate("/body/user")}
            className="bg-color-dark-gray text-color-white px-4 py-2 rounded"
          >
            {t("cancel")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProfile;
