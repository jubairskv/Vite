import React from "react";
import ProofOfAddressForm from "./ProofOfAddressForm";
import { PROOF_OF_ADDRESS_ADD } from "../../../../Utils/Constant";
import useAdd from "../../../../Hooks/InstaEnroll/useAdd";

const AddProofOfAddress = () => {
  const { handleAddSubmit, isSubmitting, error, successMessage } = useAdd(
    PROOF_OF_ADDRESS_ADD,
    "/body/proofofaddress/:id"
  );

  return (
    <div>
      <ProofOfAddressForm
        onSubmit={handleAddSubmit}
        isSubmitting={isSubmitting}
        error={error}
        successMessage={successMessage}
      />
    </div>
  );
};

export default AddProofOfAddress;
