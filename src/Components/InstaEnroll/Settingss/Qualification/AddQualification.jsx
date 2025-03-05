import React from "react";
import QualificationForm from "./QualificationForm";
import { QUALIFICATION_ADD } from "../../../../Utils/Constant";
import useAdd from "../../../../Hooks/InstaEnroll/useAdd";

const AddQualification = () => {
  
  const { handleAddSubmit, isSubmitting } = useAdd(
    QUALIFICATION_ADD,
    "/body/qualification/:id"
  );

  return (
    <div>
      <QualificationForm
        onSubmit={handleAddSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default AddQualification;
