import React from "react";
import AccountForm from "./AccountTypeForm";
import { ACCOUNT_TYPE_ADD } from "../../../../Utils/Constant";
import useAdd from "../../../../Hooks/InstaEnroll/useAdd";

const AddAccountType = () => {
  const { handleAddSubmit, isSubmitting } = useAdd(
    ACCOUNT_TYPE_ADD,
    "/body/accounttype/:id"
  );

  return (
    <div>
      <AccountForm onSubmit={handleAddSubmit} isSubmitting={isSubmitting} />
    </div>
  );
};

export default AddAccountType;
