import React from "react";
import { useSelector } from "react-redux";
import ProofOfIdentityForm from "./ProofOfIdentityForm";
import { PROOF_OF_IDENTITY_EDIT } from "../../../../Utils/Constant";
import useEdit from "../../../../Hooks/InstaEnroll/useEdit";

const EditProofOfIdentity = () => {
  const selectedProofOfIdentity = useSelector(
    (store) => store.instaEnroll.proofOfIdentitySelectedItem
  );

  const { handleEditSubmit, isSubmitting } = useEdit(PROOF_OF_IDENTITY_EDIT);

  const handleSubmit = (payload) => {
    handleEditSubmit(payload, "/body/proofofidentity/:id");
  };

  return (
    <div>
      <ProofOfIdentityForm
        selectedProofOfIdentity={selectedProofOfIdentity}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default EditProofOfIdentity;
