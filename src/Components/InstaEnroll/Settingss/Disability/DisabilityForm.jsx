import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DisabilityForm = ({ selectedDisability, onSubmit, isSubmitting }) => {
  const [disabilityName, setDisabilityName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (selectedDisability) {
      setDisabilityName(selectedDisability.disability_name);
      setDescription(selectedDisability.description);
    } else {
      setDisabilityName("");
      setDescription("");
    }
  }, [selectedDisability]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      disability_name: disabilityName,
      description: description,
      id: selectedDisability?.id,
    };
    onSubmit(payload);
    console.log(payload);
  };

  return (
    <div className="mt-4 ml-4 min-h-[80vh] mr-4 flex flex-col items-start">
      <h1 className="text-2xl font-bold text-gray-800 flex">
        {selectedDisability ? "Edit Disability" : "Create Disability"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="relative w-full  bg-white rounded-lg space-y-8 mt-5 min-h-[80vh]"
        noValidate
      >
        {/* Disability Name Input */}
        <div className="flex flex-col sm:flex-row justify-stretch gap-4">
          <div className="flex flex-col items-start">
            <label
              htmlFor="disabilityName"
              className="text-sm font-medium text-gray-700"
            >
              {t("disability_type")}
            </label>
            <input
              type="text"
              id="disabilityName"
              value={disabilityName}
              onChange={(e) => setDisabilityName(e.target.value.toUpperCase())}
              className="mt-1 w-full p-3 text-gray-800 border border-blue-400 rounded-lg shadow-md focus:shadow-[3.4px_4px_0px_#0096FF] focus:border-b-4 focus:border-r-4 focus:border-blue-500 focus:outline-none  transition-all duration-200 ease-in-out appearance-none"
              placeholder={t("disability_placeholder_text")}
              required
              autoComplete="off"
            />
          </div>

          {/* Description Input */}
          <div className="flex flex-col items-start">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              {t("description")}
            </label>
            <input
              type="text"
              id="description"
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
        <div className="absolute bottom-2 right-3 space-x-4 mt-7">
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
              : selectedDisability
              ? t("saveChanges")
              : t("submit")}
          </button>

          <button
            type="button"
            onClick={() => navigate("/body/disability/:id")}
            className="mt-4 sm:mt-0 py-2 px-6 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
          >
            {t("back")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DisabilityForm;
