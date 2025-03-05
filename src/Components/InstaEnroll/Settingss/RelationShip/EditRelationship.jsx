import React from "react";
import { useSelector } from "react-redux";
import RelationshipForm from "./RelationshipForm";
import { RELATIONSHIP_EDIT } from "../../../../Utils/Constant";
import useEdit from "../../../../Hooks/InstaEnroll/useEdit";

const EditRelationship = () => {
  const selectedRelationship = useSelector(
    (store) => store.instaEnroll.relationshipSelectedItem
  );
  

  const { handleEditSubmit, isSubmitting, error, successMessage } =
    useEdit(RELATIONSHIP_EDIT);

  const handleSubmit = (payload) => {
    handleEditSubmit(payload,  "/body/relationship/:id");
  };

  return (
    <div>
      <RelationshipForm
        selectedRelationship={selectedRelationship}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      {error && <p className="text-color-red">{error}</p>}
      {successMessage && <p className="text-color-green">{successMessage}</p>}
    </div>
  );
};

export default EditRelationship;
