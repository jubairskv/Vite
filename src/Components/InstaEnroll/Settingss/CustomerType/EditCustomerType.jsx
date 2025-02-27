import React from "react";
import { useSelector } from "react-redux";
import CustomerTypeForm from "./CustomerTypeForm";
import { CUSTOMER_TYPE_EDIT } from "../../../../Utils/Constant";
import useEdit from "../../../../Hooks/InstaEnroll/useEdit";

const EditCustomerType = () => {
  const selectedCustomerType = useSelector(
    (store) => store.instaEnroll.custTypeSelectedItem
  );

  const { handleEditSubmit, isSubmitting } = useEdit(CUSTOMER_TYPE_EDIT);

  const handleSubmit = (payload) => {
    handleEditSubmit(payload, "/body/customertype/:id");
  };

  return (
    <div>
      <CustomerTypeForm
        selectedCustomerType={selectedCustomerType}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default EditCustomerType;
