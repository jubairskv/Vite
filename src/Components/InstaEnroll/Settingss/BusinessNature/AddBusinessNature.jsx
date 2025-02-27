import React from "react";
import BusinessNatureForm from "./BusinessNatureForm";
import { BUSINESS_ADD } from "../../../../Utils/Constant";
import useAdd from "../../../../Hooks/InstaEnroll/useAdd";

const AddBusinessNature = () => {
  const { handleAddSubmit, isSubmitting } = useAdd(
    BUSINESS_ADD,
    "/body/businessnature/:id"
  );

  return (
    <div>
      <BusinessNatureForm
        onSubmit={handleAddSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default AddBusinessNature;
