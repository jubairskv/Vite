import React from "react";
import { useSelector } from "react-redux";
import AddressTypeForm from "./AddressTypeForm";
import { ADDRESS_TYPE_EDIT } from "../../../../Utils/Constant";
import useEdit from "../../../../Hooks/InstaEnroll/useEdit";

const EditAddressType = () => {
  const selectedAddressType = useSelector(
    (state) => state.instaEnroll.addressTypeSelectedItem
  );

  const { handleEditSubmit, isSubmitting } = useEdit(ADDRESS_TYPE_EDIT);

  const handleSubmit = (payload) => {
    handleEditSubmit(payload, "/body/addresstype/:id");
  };

  return (
    <div>
      <AddressTypeForm
        selectedAddressType={selectedAddressType}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default EditAddressType;
