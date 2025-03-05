import React from "react";
import AddressTypeForm from "./AddressTypeForm";
import { ADDRESS_TYPE_ADD } from "../../../../Utils/Constant";
import useAdd from "../../../../Hooks/InstaEnroll/useAdd";

const AddAddressType = () => {
  const { handleAddSubmit, isSubmitting, error, successMessage } = useAdd(
    ADDRESS_TYPE_ADD,
    "/body/addresstype/:id"
  );

  return (
    <div>
      <AddressTypeForm onSubmit={handleAddSubmit} isSubmitting={isSubmitting} />
      {error && <p className="text-color-red">{error}</p>}
      {successMessage && <p className="text-color-green">{successMessage}</p>}
    </div>
  );
};

export default AddAddressType;
