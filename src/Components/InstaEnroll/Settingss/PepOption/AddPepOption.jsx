import React, { useState } from "react";
import PepOptionForm from "./PepOptionForm";
import { PEP_OPTION_ADD } from "../../../../Utils/Constant";
import useAdd from "../../../../Hooks/InstaEnroll/useAdd";

const AddPepOption = () => {
  const { handleAddSubmit, isSubmitting, error, successMessage } = useAdd(
    PEP_OPTION_ADD,
    "/body/pepoption/:id"
  );

  return (
    <div>
      <PepOptionForm onSubmit={handleAddSubmit} isSubmitting={isSubmitting} />
      {error && <p className="text-color-red">{error}</p>}
      {successMessage && <p className="text-color-green">{successMessage}</p>}
    </div>
  );
};

export default AddPepOption;
