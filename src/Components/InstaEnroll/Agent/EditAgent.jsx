import React from "react";
import { useSelector } from "react-redux";
import AgentForm from "./AgentForm";
import { AGENT_EDIT } from "../../../Utils/Constant";
import useEditAgent from "../../../Hooks/InstaEnroll/useEditAgent";

const EditAgent = () => {
  const selectedAgent = useSelector(
    (store) => store.instaEnroll.agentSelectedItem
  );
  console.log(selectedAgent)

  const { handleEditSubmit, isSubmitting } = useEditAgent(AGENT_EDIT);

  const handleSubmit = (payload) => {
    handleEditSubmit(payload, "/body/agent/:id");
  };

  return (
    <div>
      <AgentForm
        selectedAgent={selectedAgent}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default EditAgent;
