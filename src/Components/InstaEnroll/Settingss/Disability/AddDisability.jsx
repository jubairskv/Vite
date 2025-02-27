import React from "react";
import DisabilityForm from "./DisabilityForm";
import { DISABILITY_ADD } from "../../../../Utils/Constant";
import useAdd from "../../../../Hooks/InstaEnroll/useAdd";

const AddDisability = () => {
  const { handleAddSubmit, isSubmitting, error, successMessage } = useAdd(
    DISABILITY_ADD,
    "/body/disability/:id"
  );

  return (
    <div>
      <DisabilityForm onSubmit={handleAddSubmit} isSubmitting={isSubmitting} />
      {error && <p className="text-color-red">{error}</p>}
      {successMessage && <p className="text-color-green">{successMessage}</p>}
    </div>
  );
};

export default AddDisability;
