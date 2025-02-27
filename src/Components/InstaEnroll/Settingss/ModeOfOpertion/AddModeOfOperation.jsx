import React from "react";
import ModeOfOpertionForm from "./ModeOfOpertionForm";
import { MODE_OF_OPERATION_ADD } from "../../../../Utils/Constant";
import useAdd from "../../../../Hooks/InstaEnroll/useAdd";

const AddModeOfOpertion = () => {
  const { handleAddSubmit, isSubmitting, error, successMessage } = useAdd(
    MODE_OF_OPERATION_ADD,
    "/body/modeofoperation/:id"
  );


  return (
    <div>
      <ModeOfOpertionForm
        onSubmit={handleAddSubmit}
        isSubmitting={isSubmitting}
      />
      {error && <p className="text-color-red">{error}</p>}
      {successMessage && <p className="text-color-green">{successMessage}</p>}
    </div>
  );
};

export default AddModeOfOpertion;
