import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddreesProofForm from "./ProofOfAddressForm";
import { PROOF_OF_ADDRESS_EDIT } from "../../../../Utils/Constant";
import useEdit from "../../../../Hooks/InstaEnroll/useEdit";

const EditProofOfAddress = () => {
  const selectedAddressProof = useSelector(
    (store) => store.instaEnroll.addProofSelectedItem
  );

  const { handleEditSubmit, isSubmitting } = useEdit(PROOF_OF_ADDRESS_EDIT);

  const handleSubmit = (payload) => {
    handleEditSubmit(payload, "/body/proofofaddress/:id");
  };
  return (
    <div>
      <AddreesProofForm
        selectedAddressProof={selectedAddressProof}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default EditProofOfAddress;
