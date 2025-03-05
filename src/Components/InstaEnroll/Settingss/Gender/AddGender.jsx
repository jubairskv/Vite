import React from "react";
import GenderForm from "./GenderFrom";
import { GENDER_ADD } from "../../../../Utils/Constant";
import useAdd from "../../../../Hooks/InstaEnroll/useAdd";

const AddGender = () => {
  const { handleAddSubmit, isSubmitting, error, successMessage } = useAdd(
    GENDER_ADD,
    "/body/gender/:id"
  );

  return (
    <div>
      <GenderForm onSubmit={handleAddSubmit} isSubmitting={isSubmitting} />
      {error && <p className="text-color-red">{error}</p>}
      {successMessage && <p className="text-color-green">{successMessage}</p>}
    </div>
  );
};

export default AddGender;
