import React from "react";
import { useSelector } from "react-redux";
import CommissionForm from "./CommissionForm";
import { COMMISSION_EDIT } from "../../../../Utils/Constant";
import useEdit from "../../../../Hooks/InstaEnroll/useEdit";

const EditCommisssion = () => {
  const selectedComissionType = useSelector(
    (store) => store.instaEnroll.commissionSelectedItem
  );

  console.log(selectedComissionType);

  const { handleEditSubmit, isSubmitting } = useEdit(COMMISSION_EDIT);

  const handleSubmit = (payload) => {
    handleEditSubmit(payload, "/body/commission/:id");
  };

  return (
    <div>
      <CommissionForm
        selectedCommission={selectedComissionType}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default EditCommisssion;
