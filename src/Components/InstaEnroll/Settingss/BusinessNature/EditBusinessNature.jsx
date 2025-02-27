import React from "react";
import { useSelector } from "react-redux";
import BusinessNatureForm from "./BusinessNatureForm";
import { BUSINESS_EDIT } from "../../../../Utils/Constant";
import useEdit from "../../../../Hooks/InstaEnroll/useEdit";

const EditBusinessNature = () => {
  const selectedBusinessNature = useSelector(
    (store) => store.instaEnroll.businessNatureSelectedItem
  );

  const { handleEditSubmit, isSubmitting } = useEdit(BUSINESS_EDIT);

  const handleSubmit = (payload) => {
    handleEditSubmit(payload, "/body/businessnature/:id");
  };

  return (
    <div>
      <BusinessNatureForm
        selectedBusiness={selectedBusinessNature}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default EditBusinessNature;
