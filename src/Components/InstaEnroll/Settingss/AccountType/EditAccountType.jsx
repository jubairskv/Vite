import React from "react";
import { useSelector } from "react-redux";
import AccountForm from "./AccountTypeForm";
import { ACCOUNT_TYPE_EDIT } from "../../../../Utils/Constant";
import useEdit from "../../../../Hooks/InstaEnroll/useEdit";

const EditAccountType = () => {
  const selectedAccount = useSelector(
    (store) => store.instaEnroll.accTypeSelectedItem
  );

  const { handleEditSubmit, isSubmitting, error, successMessage } =
    useEdit(ACCOUNT_TYPE_EDIT);

  const handleSubmit = (payload) => {
    handleEditSubmit(payload, "/body/accounttype/:id");
  };

  return (
    <div>
      <AccountForm
        selectedAccount={selectedAccount}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      {error && <p className="text-color-red">{error}</p>}
      {successMessage && <p className="text-color-green">{successMessage}</p>}
    </div>
  );
};

export default EditAccountType;
