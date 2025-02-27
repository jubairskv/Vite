import React from "react";
import RelationshipForm from "./RelationshipForm";
import { RELATIONSHIP_ADD } from "../../../../Utils/Constant";
import useAdd from "../../../../Hooks/InstaEnroll/useAdd";

const AddRelationship = () => {

  const { handleAddSubmit, isSubmitting, error, successMessage } = useAdd(
    RELATIONSHIP_ADD,
    "/body/relationship/:id"
  );

  return (
    <div>
      <RelationshipForm onSubmit={handleAddSubmit} isSubmitting={isSubmitting} />
      {error && <p className="text-color-red">{error}</p>}
      {successMessage && <p className="text-color-green">{successMessage}</p>}
    </div>
  );
};

export default AddRelationship;
