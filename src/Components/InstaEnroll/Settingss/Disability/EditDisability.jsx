import React from "react";
import { useSelector } from "react-redux";
import DisabilityForm from "./DisabilityForm";
import { DISABILITY_EDIT } from "../../../../Utils/Constant";
import useEdit from "../../../../Hooks/InstaEnroll/useEdit";

const EditDisability = () => {
  const selectedDisability = useSelector(
    (store) => store.instaEnroll.disabilitySelectedItem
  );

  const { handleEditSubmit, isSubmitting, error, successMessage } =
    useEdit(DISABILITY_EDIT);

  const handleSubmit = (payload) => {
    handleEditSubmit(payload, "/body/disability/:id");
  };

  return (
    <div>
      <DisabilityForm
        selectedDisability={selectedDisability}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      {error && <p className="text-color-red">{error}</p>}
      {successMessage && <p className="text-color-green">{successMessage}</p>}
    </div>
  );
};

export default EditDisability;
