import React from "react";
import { useSelector } from "react-redux";
import AccountSubTypeForm from "./AccountSubTypeForm";
import { ACCOUNT_SUB_TYPE_EDIT } from "../../../../Utils/Constant";
import useEdit from "../../../../Hooks/InstaEnroll/useEdit";

const EditAccountSubType = () => {
  const selectedAccountsubType = useSelector(
    (state) => state.instaEnroll.accSubTypeSelectedItem
  );

  const { handleEditSubmit, isSubmitting } = useEdit(ACCOUNT_SUB_TYPE_EDIT);

  const handleSubmit = (payload) => {
    handleEditSubmit(payload, "/body/accountsubtype/:id");
  };

  return (
    <div>
      <AccountSubTypeForm
        onSubmit={handleSubmit}
        selectedAccountSub={selectedAccountsubType}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default EditAccountSubType;
