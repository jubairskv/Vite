import React from "react";
import CategoryForm from "./CategoryForm";
import { CATEGORY_ADD } from "../../../../Utils/Constant";
import useAdd from "../../../../Hooks/InstaEnroll/useAdd";

const AddCategory = () => {
  const { handleAddSubmit, isSubmitting, error, successMessage } = useAdd(
    CATEGORY_ADD,
    "/body/category/:id"
  );

  return (
    <div>
      <CategoryForm onSubmit={handleAddSubmit} isSubmitting={isSubmitting} />
      {error && <p className="text-color-red">{error}</p>}
      {successMessage && <p className="text-color-green">{successMessage}</p>}
    </div>
  );
};

export default AddCategory;
