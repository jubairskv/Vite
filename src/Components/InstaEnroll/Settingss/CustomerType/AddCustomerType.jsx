import React from "react";
import CustomerTypeForm from "./CustomerTypeForm";
import { CUSTOMER_TYPE_ADD } from "../../../../Utils/Constant";
import useAdd from "../../../../Hooks/InstaEnroll/useAdd";

const AddCustomerType = () => {
  const { handleAddSubmit, isSubmitting, error, successMessage } = useAdd(
    CUSTOMER_TYPE_ADD,
    "/body/customertype/:id"
  );

  return (
    <div>
      <CustomerTypeForm
        onSubmit={handleAddSubmit}
        isSubmitting={isSubmitting}
      />
      {error && <p className="text-color-red">{error}</p>}
      {successMessage && <p className="text-color-green">{successMessage}</p>}
    </div>
  );
};

export default AddCustomerType;
