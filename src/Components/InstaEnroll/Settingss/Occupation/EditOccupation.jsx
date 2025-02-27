import React from "react";
import { useSelector } from "react-redux";
import OccpuationForm from "./OccpuationForm";
import { OCCUPATION_EDIT } from "../../../../Utils/Constant";
import useEdit from "../../../../Hooks/InstaEnroll/useEdit";

const EditOccupation = () => {
  const selectedOccupation = useSelector(
    (store) => store.instaEnroll.occupationSelectedItem
  );

  const { handleEditSubmit, isSubmitting, error, successMessage } =
    useEdit(OCCUPATION_EDIT);

  const handleSubmit = (payload) => {
    handleEditSubmit(payload, "/body/occupation/:id");
  };

  return (
    <div>
      <OccpuationForm
        selectedOccupation={selectedOccupation}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      {error && <p className="text-color-red">{error}</p>}
      {successMessage && <p className="text-color-green">{successMessage}</p>}
    </div>
  );
};

export default EditOccupation;
