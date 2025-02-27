import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  RELIGION_DELETE,
  RELIGION_DELETE_AUTH,
} from "../../../../Utils/Constant";
import useDelete from "../../../../Hooks/InstaEnroll/useDelete";
import KeyValueDisplay from "../KeyValue";

const DeleteReligion = () => {
  const selectedReligion = useSelector(
    (store) => store.instaEnroll.religionSelectedItem
  );
  console.log(selectedReligion);
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const user = useSelector((store) => store?.user?.items);
  const userId = user?.map((items) => items.user_id);

  const { handleDelete, isDeleting } = useDelete(
    RELIGION_DELETE,
    RELIGION_DELETE_AUTH
  );

  const handleDeleteClick = () => {
    const payload = {
      id: selectedReligion.id,
      del_narration: feedback,
    };

    handleDelete(payload, userId, selectedReligion, "/body/religion/:id");
  };

  if (!selectedReligion) {
    return <div>No Religion data available for deletion.</div>;
  }

  return (
    <div className="p-5 w-[78] h-[43rem] overflow-y-auto scrollbar scrollbar-thumb-scrollbar-color-gray scrollbar-thumb-rounded-full scrollbar-w-2 font-roboto">
      <h2 className="text-xl font-bold mb-4 flex">Confirm Delete</h2>

      {/* Render account details */}
      <div className="border w-full h-auto mb-5 p-4 rounded-md shadow-md bg-color-white">
        <KeyValueDisplay data={selectedReligion} />
      </div>

      {/* Feedback Textarea */}
      <div className="mb-4">
        <label
          htmlFor="feedback"
          className="flex text-sm font-medium text-color-black"
        >
          Why are you deleting this Religion?
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
      <div className=" bottom-5 left-auto right-0 flex justify-end gap-2 px-4">
        <button
          onClick={handleDeleteClick}
          className="bg-color-red text-color-white px-4 py-2 rounded mr-4"
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Confirm Delete"}
        </button>
        <button
          onClick={() => navigate("/body/religion/:id")}
          className="bg-color-dark-gray text-color-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteReligion;
