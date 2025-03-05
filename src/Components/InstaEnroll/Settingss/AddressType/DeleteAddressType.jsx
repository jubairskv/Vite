import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ADDRESS_TYPE_DELETE,
  ADDRESS_TYPE_DELETE_AUTH,
} from "../../../../Utils/Constant";
import useDelete from "../../../../Hooks/InstaEnroll/useDelete";
import KeyValueDisplay from "../KeyValue";

const DeleteAddressType = () => {
  const selectedAddressType = useSelector(
    (store) => store.instaEnroll.addressTypeSelectedItem
  );
  const [feedback, setFeedback] = useState("");

  const user = useSelector((store) => store?.user?.items);
  const userId = user?.map((items) => items.user_id);

  const navigate = useNavigate();

  const { handleDelete, isDeleting } = useDelete(
    ADDRESS_TYPE_DELETE,
    ADDRESS_TYPE_DELETE_AUTH
  );

  const handleDeleteClick = () => {
    const payload = {
      address_type_id: selectedAddressType.id,
      del_narration: feedback,
    };

    handleDelete(payload, userId, selectedAddressType, "/body/addresstype/:id");
  };

  if (!selectedAddressType) {
    return <div>No Category data available for deletion.</div>;
  }

  return (
    <div className="p-5 w-[78] h-[43rem] overflow-y-auto scrollbar scrollbar-thumb-scrollbar-color-gray scrollbar-thumb-rounded-full scrollbar-w-2">
      <h2 className="text-xl font-bold mb-4 flex">Confirm Delete</h2>
      <div className="border w-full h-auto mb-5 p-4 rounded-md shadow-md bg-color-white">
        <KeyValueDisplay data={selectedAddressType} />
      </div>

      <div className="mb-4">
        <label
          htmlFor="feedback"
          className="flex text-sm font-medium text-color-black"
        >
          Why are you deleting this account?
        </label>
        <textarea
          id="feedback"
          rows="4"
          className="mt-1 block w-full p-2 border rounded-md shadow-md"
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
          onClick={() => navigate("/body/addresstype/:id")}
          className="bg-color-dark-gray text-color-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteAddressType;
