import React from "react";
import CommissionForm from "./CommissionForm";
import { COMMISSION_ADD } from "../../../../Utils/Constant";
import useAdd from "../../../../Hooks/InstaEnroll/useAdd";

const AddCommission = () => {
  const { handleAddSubmit, isSubmitting, error, successMessage } = useAdd(
    COMMISSION_ADD,
    "/body/commission/:id"
  );

  return (
    <div>
      <CommissionForm onSubmit={handleAddSubmit} isSubmitting={isSubmitting} />
      {error && <p className="text-color-red">{error}</p>}
      {successMessage && <p className="text-color-green">{successMessage}</p>}
    </div>
  );
};

export default AddCommission;
