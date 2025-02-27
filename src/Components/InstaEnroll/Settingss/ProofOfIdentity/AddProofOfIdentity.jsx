import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProofOfIdentityForm from "./ProofOfIdentityForm";
import { PROOF_OF_IDENTITY_ADD } from "../../../../Utils/Constant";
import useAdd from "../../../../Hooks/InstaEnroll/useAdd";

const AddProofOfIdentity = () => {
 
  const { handleAddSubmit, isSubmitting, error, successMessage } = useAdd(
    PROOF_OF_IDENTITY_ADD,
    "/body/proofofidentity/:id"
  );


  return (
    <div>
      <ProofOfIdentityForm
        onSubmit={handleAddSubmit}
        isSubmitting={isSubmitting}
      />
      {error && <p className="text-color-red">{error}</p>}
      {successMessage && <p className="text-color-green">{successMessage}</p>}
    </div>
  );
};

export default AddProofOfIdentity;
