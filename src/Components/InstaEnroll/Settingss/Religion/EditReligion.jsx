import React from "react";
import { useSelector } from "react-redux";
import ReligionForm from "./ReligionForm";
import { RELIGION_EDIT } from "../../../../Utils/Constant";
import useEdit from "../../../../Hooks/InstaEnroll/useEdit";

const EditReligion = () => {
  const selectedReligion = useSelector(
    (store) => store.instaEnroll.religionSelectedItem
  );
 

  const { handleEditSubmit, isSubmitting, error, successMessage } =
    useEdit(RELIGION_EDIT);

  const handleSubmit = (payload) => {
    handleEditSubmit(payload, "/body/religion/:id");
  };

  return (
    <div>
      <ReligionForm
        selectedReligion={selectedReligion}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      {error && <p className="text-color-red">{error}</p>}
      {successMessage && <p className="text-color-green">{successMessage}</p>}
    </div>
  );
};

export default EditReligion;
