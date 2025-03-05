import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const ProfileForm = ({
  profileName,
  setProfileName,
  selectedInstitution,
  setSelectedInstitution,
  institutions,
  errors,
  onSubmit,
  instname,
  showInstitutionField,
  selectedProfile,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedProfile) {
      setProfileName(selectedProfile.profile_name);
    } else {
      setProfileName("");
    }
  }, [selectedProfile, setProfileName, setSelectedInstitution]);

  const handleProfileNameChange = (e) => {
    setProfileName(e.target.value);
  };

  const handleInstitutionChange = (e) => {
    setSelectedInstitution(e.target.value);
  };

  return (
    <div className="mt-4 ml-4  mr-4">
      <h1 className="text-2xl font-bold text-gray-800 flex">
        {selectedProfile
          ? t("setting.edit_profile")
          : t("setting.create_profile")}
      </h1>
      <form onSubmit={onSubmit} className="flex-grow ">
        <div className="flex gap-48">
          {/* Profile Name Input */}
          <div className="flex flex-col items-start p-5 gap-2">
            <label className="font-roboto text-md">{t("profile_name")}</label>
            <input
              type="text"
              className={`mt-1 p-3 text-gray-800 border border-blue-400 rounded-lg shadow-md focus:shadow-[3.4px_4px_0px_#0096FF] focus:border-b-4 focus:border-r-4 focus:border-blue-500 focus:outline-none w-80 transition-all duration-200 ease-in-out${
                errors.profileName ? "border-color-red" : ""
              }`}
              value={profileName}
              onChange={handleProfileNameChange}
              placeholder={t("profile_placeholder_text")}
            />
            {errors.profileName && (
              <p className="text-color-red font-roboto text-xs">
                {errors.profileName}
              </p>
            )}
          </div>

          {/* Institution Dropdown - Conditional Rendering */}
          {showInstitutionField && (
            <div className="flex flex-col items-start p-5 gap-2">
              <label className="font-roboto text-md">{t("institution")}</label>
              <select
                className={`mt-1 p-3 text-gray-800 border border-blue-400 rounded-lg shadow-md focus:shadow-[3.4px_4px_0px_#0096FF] focus:border-b-4 focus:border-r-4 focus:border-blue-500 focus:outline-none w-80 transition-all duration-200 ease-in-out${
                  errors.selectedInstitution ? "border-color-red" : ""
                }`}
                value={selectedInstitution}
                onChange={handleInstitutionChange}
              >
                <option value="" className="font-roboto text-md">
                  {t("select_institution")}
                </option>
                {institutions?.map((institution) => (
                  <option
                    key={institution.institution_id}
                    value={institution.institution_id}
                  >
                    {institution.institution_name}
                  </option>
                ))}
              </select>
              {errors.selectedInstitution && (
                <p className="text-color-red font-roboto text-xs">
                  {errors.selectedInstitution}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Submit Button Positioned Dynamically */}
        <div className="flex justify-end right-3 top-[45rem] p-2">
          {(selectedInstitution || selectedProfile) && (
            <button
              type="submit"
              className="bg-gradient-to-br from-[#3d78b6] to-[#20205f] text-color-white px-4 py-2 rounded hover:bg-color-blue font-roboto text-md"
            >
              {t("submit")}
            </button>
          )}
          <button
            type="button"
            onClick={() => navigate("/body/profile/:id")}
            className="bg-blue-500 text-color-white py-2 px-6 rounded hover:bg-blue-600 ml-2 font-roboto text-md"
          >
            {t("back")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
