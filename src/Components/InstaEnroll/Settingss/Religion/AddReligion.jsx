import React, { useState } from "react";
import ReligionForm from "./ReligionForm";
import { RELIGION_ADD } from "../../../../Utils/Constant";
import useAdd from "../../../../Hooks/InstaEnroll/useAdd";

const AddReligion = () => {

  const { handleAddSubmit, isSubmitting, error, successMessage } = useAdd(
    RELIGION_ADD,
    "/body/religion/:id"
  );

  return (
    <div>
      <ReligionForm onSubmit={handleAddSubmit} isSubmitting={isSubmitting} />
      {error && <p className="text-color-red">{error}</p>}
      {successMessage && <p className="text-color-green">{successMessage}</p>}
    </div>
  );
};

export default AddReligion;
