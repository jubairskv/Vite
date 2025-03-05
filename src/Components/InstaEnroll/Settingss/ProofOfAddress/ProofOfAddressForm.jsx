import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { FaChevronDown } from "react-icons/fa";

const ProofOfAddressForm = ({
  selectedAddressProof,
  onSubmit,
  isSubmitting,

}) => {
  const [addressProofName, setAddressProofName] = useState("");
  const [entityType, setEntityType] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const CustomerType = useSelector((store) => store.instaEnroll.cusTypeData);

  useEffect(() => {
    if (selectedAddressProof) {
      setAddressProofName(selectedAddressProof.doc_type);
      setEntityType(selectedAddressProof.entity_type);
    } else {
      setAddressProofName("");
      setEntityType("");
    }
  }, [selectedAddressProof]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      doc_type: addressProofName,
      entity_type: Number(entityType),
      addressproof_id: selectedAddressProof?.addr_doc_id, // Only pass id if editing
    };
    onSubmit(payload); // Pass the form data to the parent component
  };

  return (
    <div className="mt-4 ml-4 min-h-[80vh] mr-4 flex flex-col items-start">
      <h1 className="text-2xl font-bold text-gray-800 flex">
        {selectedAddressProof ? "Edit Address Proof" : "Create Address Proof"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="relative w-full  bg-white rounded-lg space-y-8 mt-5 min-h-[80vh]"
        noValidate
      >
        {/* Address Proof Name Input */}
        <div className="flex flex-col sm:flex-row gap-8 justify-stretch">
          <div className="flex flex-col items-start w-full lg:w-96">
            <label
              htmlFor="addressProofName"
              className="text-sm font-medium text-gray-700"
            >
              {t("address_proof_name")}
            </label>
            <input
              type="text"
              id="addressProofName"
              value={addressProofName}
              onChange={(e) =>
                setAddressProofName(e.target.value.toUpperCase())
              }
              className="mt-1 p-3 text-gray-800 border border-blue-400 rounded-lg shadow-md focus:shadow-[3.4px_4px_0px_#0096FF] focus:border-b-4 focus:border-r-4 focus:border-blue-500 focus:outline-none w-full transition-all duration-200 ease-in-out appearance-none"
              placeholder={t("address_proof_placeholder_text")}
              required
              autoComplete="off"
            />
          </div>

          {/* Entity Type Select */}
          <div className="flex flex-col items-start relative w-full lg:w-96">
            <label
              htmlFor="entityType"
              className="text-sm font-medium text-gray-700"
            >
              {t("select_entity_type")}
            </label>
            <div className="relative  mt-1 w-full">
              <select
                id="entityType"
                value={entityType}
                onChange={(e) => setEntityType(e.target.value)}
                className="mt-1 p-3 text-gray-800 border border-blue-400 rounded-lg shadow-md focus:shadow-[3.4px_4px_0px_#0096FF] focus:border-b-4 focus:border-r-4 focus:border-blue-500 focus:outline-none w-full transition-all duration-200 ease-in-out appearance-none"
              >
                <option value="" disabled>
                  {t("select_type_placeholder")}
                </option>
                {CustomerType?.filter(
                  (customeType) =>
                    customeType?.type_name && customeType?.process_status === 1
                )?.map((customeType) => (
                  <option key={customeType?.id} value={customeType?.id}>
                    {customeType?.type_name}
                  </option>
                ))}
              </select>
              <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <FaChevronDown className="text-gray-600" />
              </span>
            </div>
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
              : selectedAddressProof
              ? t("saveChanges")
              : t("submit")}
          </button>

          <button
            type="button"
            onClick={() => navigate("/body/proofofaddress/:id")}
            className="py-2 px-6 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
          >
            {t("back")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProofOfAddressForm;
