import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ModeOfOperationForm = ({
  selectedModeOfOperation,
  onSubmit,
  isSubmitting,
}) => {
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (selectedModeOfOperation) {
      setDescription(selectedModeOfOperation.doc_type);
    } else {
      setDescription("");
    }
  }, [selectedModeOfOperation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      doc_type: description,
      no_of_users: selectedModeOfOperation?.num_of_users_required,
      id: selectedModeOfOperation?.mode_id,
    };
    onSubmit(payload);
    console.log(payload);
  };

  return (
    <div className="mt-4 ml-4 min-h-[80vh] mr-4 flex flex-col items-start">
      <h1 className="text-2xl font-bold text-gray-800 flex">
        {selectedModeOfOperation
          ? "Edit Mode of Operation"
          : "Create Mode of Operation"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="relative w-full  bg-white rounded-lg space-y-8 mt-5 min-h-[80vh]"
        noValidate
      >
        {/* Description Input */}
        <div className="flex flex-col sm:flex-row gap-8">
          <div className="flex flex-col items-start w-full lg:w-96">
            <label
              htmlFor="mode_of_operation"
              className="text-sm font-medium text-gray-700"
            >
              {t("mode_of_operation")}
            </label>
            <input
              type="text"
              id="mode_of_operation"
              value={description}
              onChange={(e) => setDescription(e.target.value.toUpperCase())}
              className="mt-1 p-3 text-gray-800 border border-blue-400 rounded-lg shadow-md focus:shadow-[3.4px_4px_0px_#0096FF] focus:border-b-4 focus:border-r-4 focus:border-blue-500 focus:outline-none w-full transition-all duration-200 ease-in-out appearance-none"
              placeholder={t("description_placeholder_text")}
              required
              autoComplete="off"
              minLength="6"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="relative md:absolute  bottom-4 right-4 flex justify-end gap-4 mt-8">
          <button
            type="submit"
            className={`py-2 px-6 bg-blue-500 text-white rounded-md transition ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? t("submitting")
              : selectedModeOfOperation
              ? t("saveChanges")
              : t("submit")}
          </button>

          <button
            type="button"
            onClick={() => navigate("/body/modeofoperation/:id")}
            className="mt-4 sm:mt-0 py-2 px-6 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
          >
            {t("back")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModeOfOperationForm;
