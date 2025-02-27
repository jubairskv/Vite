import React from "react";
import { useSelector } from "react-redux";
import GenderForm from "./GenderFrom";
import { GENDER_EDIT } from "../../../../Utils/Constant";
import useEdit from "../../../../Hooks/InstaEnroll/useEdit";

const EditGender = () => {
  const selectedGender = useSelector(
    (store) => store.instaEnroll.genderSelectedItem
  );

  const { handleEditSubmit, isSubmitting } = useEdit(GENDER_EDIT);

  const handleSubmit = (payload) => {
    handleEditSubmit(payload, "/body/gender/:id");
  };

  return (
    <div>
      <GenderForm
        selectedGender={selectedGender}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default EditGender;
