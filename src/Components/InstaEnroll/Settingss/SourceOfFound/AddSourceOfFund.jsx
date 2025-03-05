import React from "react";
import SourceOfFoundForm from "./SourceOfFoundForm";
import { SOURCE_OF_FUND_ADD } from "../../../../Utils/Constant";
import useAdd from "../../../../Hooks/InstaEnroll/useAdd";

const AddSourceOfFound = () => {
  const { handleAddSubmit, isSubmitting, error, successMessage } = useAdd(
    SOURCE_OF_FUND_ADD,
    "/body/sourceoffund/:id"
  );

  console.log(successMessage);
  console.log(error);

  return (
    <div>
      <SourceOfFoundForm
        onSubmit={handleAddSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default AddSourceOfFound;
