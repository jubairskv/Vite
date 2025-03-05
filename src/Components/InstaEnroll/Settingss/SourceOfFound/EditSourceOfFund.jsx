import React from "react";
import { useSelector } from "react-redux";
import SourceOfFoundForm from "./SourceOfFoundForm";
import { SOURCE_OF_FUND_EDIT } from "../../../../Utils/Constant";
import useEdit from "../../../../Hooks/InstaEnroll/useEdit";

const EditSourceOfFound = () => {
  const selectedSourcOfFund = useSelector(
    (store) => store.instaEnroll.sourceOfFundSelectedItem
  );

  const { handleEditSubmit, isSubmitting } = useEdit(SOURCE_OF_FUND_EDIT);

  const handleSubmit = (payload) => {
    handleEditSubmit(payload, "/body/sourceoffund/:id");
  };

  return (
    <div>
      <SourceOfFoundForm
        selectedSourcOfFund={selectedSourcOfFund}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default EditSourceOfFound;
