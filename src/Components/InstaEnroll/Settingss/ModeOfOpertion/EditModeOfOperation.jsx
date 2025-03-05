import React from "react";
import { useSelector } from "react-redux";
import ModeOfOpertionForm from "./ModeOfOpertionForm";
import { MODE_OF_OPERATION_EDIT } from "../../../../Utils/Constant";
import useEdit from "../../../../Hooks/InstaEnroll/useEdit";

const EditModeOfOperation = () => {
  const selectedModeOfOperation = useSelector(
    (store) => store.instaEnroll.modeOfOperationSelectedItem
  );

  const { handleEditSubmit, isSubmitting, error, successMessage } = useEdit(
    MODE_OF_OPERATION_EDIT
  );

  const handleSubmit = (payload) => {
    handleEditSubmit(payload, "/body/modeofoperation/:id");
  };

  return (
    <div>
      <ModeOfOpertionForm
        selectedModeOfOperation={selectedModeOfOperation}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      {error && <p className="text-color-red">{error}</p>}
      {successMessage && <p className="text-color-green">{successMessage}</p>}
    </div>
  );
};

export default EditModeOfOperation;
