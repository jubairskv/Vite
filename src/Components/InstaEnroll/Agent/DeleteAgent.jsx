import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AGENT_DELETE_AUTH, AGENT_DELETE } from "../../../Utils/Constant";
import useDelete from "../../../Hooks/InstaEnroll/useDelete";
import KeyValueDisplay from "../Settingss/KeyValue";

const DeleteAccountSubType = () => {
  const [feedbackSub, setFeedbackSub] = useState("");

  const user = useSelector((store) => store?.user?.items);
  const userId = user?.map((items) => items.user_id);

  const navigate = useNavigate();

  const selectedAgent = useSelector(
    (state) => state.instaEnroll.agentSelectedItem
  );

  const { handleDelete, isDeleting } = useDelete(
    AGENT_DELETE,
    AGENT_DELETE_AUTH
  );

  const handleDeleteClick = () => {
    const payload = {
      agent_id: selectedAgent.agent_id,
      del_narration: feedbackSub,
    };

    handleDelete(payload, userId, selectedAgent, "/body/agent/:id");
  };

  if (!selectedAgent) {
    return <div>No account data available for deletion.</div>;
  }

  return (
    <div className="px-5 pt-2 font-roboto  w-[78] h-[43rem] overflow-y-auto scrollbar scrollbar-thumb-scrollbar-color-gray scrollbar-thumb-rounded-full scrollbar-w-2">
      <h2 className="text-lg font-bold mb-2 flex ">Confirm Delete</h2>
      <div className="border mb-1 p-4 rounded-md shadow-md bg-color-white">
        <KeyValueDisplay data={selectedAgent} />
      </div>

      <div className="mb-4 flex flex-col">
        <label
          htmlFor="feedback"
          className="text-sm font-medium  flex py-2 text-color-black"
        >
          Why are you deleting this account?
        </label>
        <textarea
          id="feedback"
          rows="4"
          className="mt-1 block w-full h-[75px] p-2 border rounded-md shadow-md outline-none"
          placeholder="Provide a reason for deletion (e.g., incorrect data, no longer needed)"
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
          {isDeleting ? "Deleting..." : "Confirm Delete"}
        </button>
        <button
          onClick={() => navigate("/body/agent")}
          className="bg-color-dark-gray text-color-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteAccountSubType;
