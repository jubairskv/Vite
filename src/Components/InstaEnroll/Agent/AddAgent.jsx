import React from "react";
import AgentForm from "./AgentForm";
import { AGENT_ADD } from "../../../Utils/Constant";
import useAddAgent from "../../../Hooks/InstaEnroll/useAddAgent";

const AddAgent = () => {
  const { handleAddSubmit, isSubmitting } = useAddAgent(
    AGENT_ADD,
    "/body/agent/:id"
  );

  return (
    <div>
      <AgentForm onSubmit={handleAddSubmit} isSubmitting={isSubmitting} />
    </div>
  );
};

export default AddAgent;
