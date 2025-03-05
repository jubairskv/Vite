import React from "react";
import { useSelector } from "react-redux";
import QualificationForm from "./QualificationForm";
import { QUALIFICATION_EDIT } from "../../../../Utils/Constant";
import useEdit from "../../../../Hooks/InstaEnroll/useEdit";

const EditQualification = () => {
  const selectedQualification = useSelector(
    (store) => store.instaEnroll.qualificationSelectedItem
  );


  const { handleEditSubmit, isSubmitting } = useEdit(QUALIFICATION_EDIT);

  const handleSubmit = (payload) => {
    handleEditSubmit(payload, "/body/qualification/:id");
  };

  return (
    <div>
      <QualificationForm
        selectedQualification={selectedQualification}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default EditQualification;
