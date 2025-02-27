import React from "react";
import OccupationForm from "./OccpuationForm";
import { OCCUPATION_ADD } from "../../../../Utils/Constant";
import useAdd from "../../../../Hooks/InstaEnroll/useAdd";

const AddOccupation = () => {
  const { handleAddSubmit, isSubmitting, error, successMessage } = useAdd(
    OCCUPATION_ADD,
    "/body/occupation/:id"
  );

  return (
    <div>
      <OccupationForm onSubmit={handleAddSubmit} isSubmitting={isSubmitting} />
      {error && <p className="text-color-red">{error}</p>}
      {successMessage && <p className="text-color-green">{successMessage}</p>}
    </div>
  );
};

export default AddOccupation;
