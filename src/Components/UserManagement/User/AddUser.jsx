import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserForm from "./UserFrom";
import { USER_ADD } from "../../../Utils/Constant";

const AddUser = () => {
  const token = useSelector((store) => store.token.token);
  const deviceId = useSelector((store) => store.token.deviceId);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const globalActionId = useSelector(
    (store) => store.instaEnroll.globalActionsId
  );
  
  console.log("actionId", globalActionId);

  const handleAddSubmit = async (payload) => {
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);
    console.log(payload);

    try {
      const response = await fetch(USER_ADD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          DeviceID: deviceId,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.statusText}`);
      }
      const responseData = await response.json();
      console.log(responseData)

      setSuccessMessage("Account type added successfully!");
      navigate("/body/user/:id");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <UserForm onSubmit={handleAddSubmit} isSubmitting={isSubmitting} />
    </div>
  );
};

export default AddUser;
