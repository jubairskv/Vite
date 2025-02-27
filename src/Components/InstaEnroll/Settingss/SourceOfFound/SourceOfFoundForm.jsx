import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SourcOfFundForm = ({ selectedSourcOfFund, onSubmit, isSubmitting }) => {
  const [sourceOfFoundName, setSourceOfFoundName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (selectedSourcOfFund) {
      setSourceOfFoundName(selectedSourcOfFund.source_name);
      setDescription(selectedSourcOfFund.description);
    } else {
      setSourceOfFoundName("");
      setDescription("");
    }
  }, [selectedSourcOfFund]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      source_name: sourceOfFoundName,
      description: description,
      id: selectedSourcOfFund?.id, // Only pass id if editing
    };
    onSubmit(payload); // Pass the form data to the parent component
    console.log(payload);
  };

  return (
    <div className="mt-4 ml-4 min-h-[80vh] mr-4 flex flex-col items-start">
      <h1 className="text-2xl font-bold text-gray-800 flex">
        {selectedSourcOfFund ? "Edit Source of Fund" : "Create Source of Fund"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="relative w-full  bg-white rounded-lg space-y-8 mt-5 min-h-[80vh]"
        noValidate
      >
        {/* Source of Fund Name Input */}
        <div className="flex flex-col sm:flex-row gap-8 justify-stretch">
          <div className="flex flex-col items-start w-full lg:w-96">
            <label
              htmlFor="sourceOfFoundName"
              className="text-sm font-medium text-gray-700"
            >
              {t("source_of_fund_name")}
            </label>
            <input
              type="text"
              id="sourceOfFoundName"
              value={sourceOfFoundName}
              onChange={(e) =>
                setSourceOfFoundName(e.target.value.toUpperCase())
              }
              className="mt-1 p-3 text-gray-800 border border-blue-400 rounded-lg shadow-md focus:shadow-[3.4px_4px_0px_#0096FF] focus:border-b-4 focus:border-r-4 focus:border-blue-500 focus:outline-none w-full transition-all duration-200 ease-in-out appearance-none"
              placeholder={t("source_of_fund_placeholder_text")}
              required
              autoComplete="off"
            />
          </div>

          {/* Description Input */}
          <div className="flex flex-col items-start w-full lg:w-96">
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
              : selectedSourcOfFund
              ? t("saveChanges")
              : t("submit")}
          </button>

          <button
            type="button"
            onClick={() => navigate("/body/sourceoffund/:id")}
            className="py-2 px-6 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
          >
            {t("back")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SourcOfFundForm;
