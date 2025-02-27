import React from "react";
import { useSelector } from "react-redux";
import CategoryForm from "./CategoryForm";
import { CATEGORY_EDIT } from "../../../../Utils/Constant";
import useEdit from "../../../../Hooks/InstaEnroll/useEdit";

const EditCategory = () => {
  const selectedCategory = useSelector(
    (state) => state.instaEnroll.categorySelectedItem
  );

  const { handleEditSubmit, isSubmitting } = useEdit(CATEGORY_EDIT);

  const handleSubmit = (payload) => {
    handleEditSubmit(payload, "/body/category/:id");
  };

  return (
    <div>
      <CategoryForm
        selectedCategory={selectedCategory}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default EditCategory;
