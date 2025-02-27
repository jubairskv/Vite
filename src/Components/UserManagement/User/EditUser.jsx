import React from "react";
import { useSelector } from "react-redux";
import UserForm from "./UserFrom";
import { USER_EDIT } from "../../../Utils/Constant";
import useEdit from "../../../Hooks/UserManagement/useEditUserManagementData";

const EditUser = () => {
  const selectedUser = useSelector(
    (store) => store.userManagements.userSelItem
  );

  //   if (!selectedUser) {
  //     return <div>No user data available.</div>;
  //   }

  const { editProfile, isSubmitting, error, successMessage } = useEdit();

  const handleSubmit = (payload) => {
    editProfile(payload, USER_EDIT, "/body/user/:id");
  };

  return (
    <div>
      <UserForm
        selectedUser={selectedUser}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      {error && <p className="text-color-red">{error}</p>}
      {successMessage && <p className="text-color-green">{successMessage}</p>}
    </div>
  );
};

export default EditUser;
