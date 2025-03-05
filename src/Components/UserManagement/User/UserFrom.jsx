import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const UserForm = ({ selectedUser, onSubmit, isSubmitting }) => {
  console.log(selectedUser);
  const { t } = useTranslation();
  const [profileName, setProfileName] = useState("");
  const [password, setPassword] = useState("");
  const [selectedProfile, setSelectedProfile] = useState("");

  const triggerSubMenuData = useSelector(
    (store) => store?.user?.triggerSubMenu
  );

  const actions = triggerSubMenuData?.actions?.map((action) => action);
  const desc = actions?.map((desc) => desc.menu_header_desc);
  const actionId = triggerSubMenuData?.actions?.map(
    (action) => action.action_id
  );
  const Id = actionId?.filter((id) => id === 1);

  const menuId = triggerSubMenuData.menu_id;

  const listProfile = useSelector((store) => store?.user?.listProfile);

  const globalActionId = useSelector(
    (store) => store.instaEnroll.globalActionsId
  );

  console.log(globalActionId);

  const listProfileName = listProfile?.profile_array?.map((item) => ({
    profile_id: item?.profile_id,
    profile_name: item?.profile_name,
    institution_id: item?.inst_id,
  }));

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedUser) {
      setProfileName(selectedUser?.username);
      setPassword(selectedUser?.password_hash);
      setSelectedProfile(selectedUser?.profile_id);
    } else {
      setProfileName("");
      setPassword("");
      setSelectedProfile("");
    }
  }, [selectedUser]);

  const selectedProfileDetails = listProfileName?.find(
    (profile) => profile.profile_id === Number(selectedProfile)
  );
  const institutionId = selectedProfileDetails?.institution_id;

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      user_id: selectedUser?.user_id,
      user_name: profileName,
      user_pwd: password,
      inst_id: institutionId,
      profile_id: Number(selectedProfile),
      menu_info: {
        menu_id: menuId,
        action_id: 1,
      },
    };
    onSubmit(payload);
  };

  const handleProfileNameChange = (e) => {
    setProfileName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleProfileChange = (e) => {
    setSelectedProfile(e.target.value);
  };

  return (
    <div className="mt-4 ml-4 min-h-[80vh] mr-4">
      <h1 className="text-2xl font-bold text-gray-800 flex">
        {selectedUser ? "Edit User" : "Create User"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="relative w-full p-6 sm:p-10 bg-white rounded-lg space-y-8 mt-5 min-h-[80vh]"
        noValidate
      >
        {/* Business Name Input */}
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col items-start">
            <label className="text-sm font-medium text-gray-700">
              {t("user_name")}
            </label>
            <input
              type="text"
              className="mt-1 p-3 text-gray-800 border border-gray-800 rounded-lg shadow-md focus:shadow-[3.4px_4px_0px_#0096FF] focus:border-b-4 focus:border-r-4 focus:border-blue-500 focus:outline-none w-80 transition-all duration-200 ease-in-out appearance-none"
              value={profileName}
              onChange={handleProfileNameChange}
              placeholder={t("user_placeholder_text")}
              autoComplete="off"
            />
          </div>

          {/* Description Input */}
          <div className="flex flex-col items-start">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              {t("password_label")}
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-3 text-gray-800 border border-gray-800 rounded-lg shadow-md focus:shadow-[3.4px_4px_0px_#0096FF] focus:border-b-4 focus:border-r-4 focus:border-blue-500 focus:outline-none w-80 transition-all duration-200 ease-in-out appearance-none"
              value={password}
              onChange={handlePasswordChange}
              required
              autoComplete="off"
              minLength="6"
              placeholder={t("password_placeholder_text")}
            />
          </div>
        </div>

        <div className="flex flex-col items-start">
          <label className="text-sm font-medium text-gray-700">
            {t("profile_name")}
          </label>
          <select
            className="mt-1 p-3 text-gray-800 border border-gray-800 rounded-lg shadow-md focus:shadow-[3.4px_4px_0px_#0096FF] focus:border-b-4 focus:border-r-4 focus:border-blue-500 focus:outline-none w-80 transition-all duration-200 ease-in-out appearance-none"
            value={selectedProfile}
            onChange={handleProfileChange}
            autoComplete="off"
          >
            <option value="" disabled className="hover:blue">
              {t("select_profile")}
            </option>
            {listProfileName?.map((profile) => (
              <option key={profile.profile_id} value={profile.profile_id}>
                {profile.profile_name}
              </option>
            ))}
          </select>
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
              : selectedUser
              ? t("saveChanges")
              : t("submit")}
          </button>

          <button
            type="button"
            onClick={() => navigate("/body/user/:id")}
            className="mt-4 sm:mt-0 py-2 px-6 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
          >
            {t("back")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
