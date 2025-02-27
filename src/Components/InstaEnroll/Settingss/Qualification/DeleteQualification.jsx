import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  QUALIFICATION_DELETE,
  QUALIFICATION_DELETE_AUTH,
} from "../../../../Utils/Constant";
import useDelete from "../../../../Hooks/InstaEnroll/useDelete";
import KeyValueDisplay from "../KeyValue";

const DeleteQualification = () => {
  const selectedQualification = useSelector(
    (store) => store.instaEnroll.qualificationSelectedItem
  );
  console.log(selectedQualification);
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");

  const user = useSelector((store) => store?.user?.items);
  const userId = user?.map((items) => items.user_id);

  const { handleDelete, isDeleting } = useDelete(
    QUALIFICATION_DELETE,
    QUALIFICATION_DELETE_AUTH
  );

  const handleDeleteClick = () => {
    const payload = {
      id: selectedQualification.id,
      del_narration: feedback,
    };

    handleDelete(payload, userId, selectedQualification, "/body/qualification/:id");
  };

  if (!selectedQualification) {
    return <div>No Occupation data available for deletion.</div>;
  }

  return (
    <div className="p-5 w-[78] h-[43rem] overflow-y-auto scrollbar scrollbar-thumb-scrollbar-color-gray scrollbar-thumb-rounded-full scrollbar-w-2font-roboto">
      <h2 className="text-xl font-bold mb-4 flex">Confirm Delete</h2>
      <div className="border w-full h-auto  p-4 rounded-md shadow-md bg-color-white">
        <KeyValueDisplay data={selectedQualification} />
      </div>
      <div className="mb-4">
        <label
          htmlFor="feedback"
          className="flex text-sm font-medium text-color-black py-2"
        >
          Why are you deleting this Qualification?
        </label>
        <textarea
          id="feedback"
          rows="4"
          className="w-full h-24 p-2 border rounded-md shadow-md outline-none"
          placeholder="Provide a reason for deletion (e.g., incorrect data, no longer needed)"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        ></textarea>
      </div>

      {/* Buttons */}
      <div className=" left-auto right-0 flex justify-end gap-2 px-4">
        <button
          onClick={handleDeleteClick}
          className="bg-color-red text-color-white px-4 py-2 rounded mr-4"
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Confirm Delete"}
        </button>
        <button
          onClick={() => navigate("/body/qualification/:id")}
          className="bg-color-dark-gray text-color-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteQualification;
