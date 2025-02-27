import React from "react";
import { useSelector } from "react-redux";
import PepOptionForm from "./PepOptionForm";
import { PEP_OPTION_EDIT } from "../../../../Utils/Constant";
import useEdit from "../../../../Hooks/InstaEnroll/useEdit";

const EditPepOption = () => {
  const selectedPepOption = useSelector(
    (store) => store.instaEnroll.pepOptionSelectedItem
  );

  const { handleEditSubmit, isSubmitting, error, successMessage } =
    useEdit(PEP_OPTION_EDIT);

  const handleSubmit = (payload) => {
    handleEditSubmit(payload, "/body/pepoption/:id");
  };

  return (
    <div>
      <PepOptionForm
        selectedPepOption={selectedPepOption}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      {error && <p className="text-color-red">{error}</p>}
      {successMessage && <p className="text-color-green">{successMessage}</p>}
    </div>
  );
};

export default EditPepOption;
