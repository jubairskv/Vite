import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BUSINEES_DELETE,
  BUSINEES_DELETE_AUTH,
} from "../../../../Utils/Constant";
import useDelete from "../../../../Hooks/InstaEnroll/useDelete";
import KeyValueDisplay from "../KeyValue";

const DeleteBusinessNature = () => {
  const selectedBusinessNature = useSelector(
    (store) => store.instaEnroll.businessNatureSelectedItem
  );
  console.log(selectedBusinessNature);
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");

  const user = useSelector((store) => store?.user?.items);
  const userId = user?.map((items) => items.user_id);

  const { handleDelete, isDeleting } = useDelete(
    BUSINEES_DELETE,
    BUSINEES_DELETE_AUTH
  );

  const handleDeleteClick = () => {
    const payload = {
      id: selectedBusinessNature.id,
      del_narration: feedback,
    };

    handleDelete(
      payload,
      userId,
      selectedBusinessNature,
      "/body/businessnature/:id"
    );
  };

  if (!selectedBusinessNature) {
    return <div>No Business data available for deletion.</div>;
  }

  return (
    <div className="p-5 w-[78] h-[43rem] overflow-y-auto scrollbar scrollbar-thumb-scrollbar-color-gray scrollbar-thumb-rounded-full scrollbar-w-2">
      <h2 className="text-xl font-bold mb-4 flex">Confirm Delete</h2>
      <div className="border rounded-md shadow-md w-full h-auto  p-4 bg-color-white">
        <KeyValueDisplay data={selectedBusinessNature} />
      </div>
      <div className="mb-4">
        <label
          htmlFor="feedback"
          className="flex text-sm font-medium text-color-black py-2"
        >
          Why are you deleting this account?
        </label>
        <textarea
          id="feedback"
          rows="4"
          className="mt-1 block w-full p-2 border rounded-md outline-none shadow-md "
          placeholder="Provide a reason for deletion (e.g., incorrect data, no longer needed)"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        ></textarea>
      </div>
      <div className=" bottom-5 left-auto right-0 flex justify-end gap-2 px-4">
        <button
          onClick={handleDeleteClick}
          className="bg-color-red text-color-white px-4 py-2 rounded mr-4"
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Confirm Delete"}
        </button>
        <button
          onClick={() => navigate("/body/businessnature/:id")}
          className="bg-color-dark-gray text-color-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteBusinessNature;
