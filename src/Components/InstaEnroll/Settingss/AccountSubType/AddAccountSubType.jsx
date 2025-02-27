import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AccountSubTypeForm from "./AccountSubTypeForm";
import { ACCOUNT_SUB_TYPE_ADD } from "../../../../Utils/Constant";
import useAdd from "../../../../Hooks/InstaEnroll/useAdd";

const AddAccountSubType = () => {
  const { handleAddSubmit, isSubmitting, error, successMessage } = useAdd(
    ACCOUNT_SUB_TYPE_ADD,
    "/body/accountsubtype/:id"
  );

  return (
    <div>
      <AccountSubTypeForm
        onSubmit={handleAddSubmit}
        isSubmitting={isSubmitting}
      />
      {error && <p className="text-color-red">{error}</p>}
      {successMessage && <p className="text-color-green">{successMessage}</p>}
    </div>
  );
};

export default AddAccountSubType;
