import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PROFILE_AUTH, PROFILE_DEAUTH } from "../../../Utils/Constant";
import { useSelector } from "react-redux";
import ViewTree from "./ViewPage/ViewTreeStrcture";
import KeyValuePairs from "../KeyValue";
import FeedbackInput from "../../InstaEnroll/Settingss/FeedbackTextBox";
import EditTree from "./EditPage/EditTreeStrcture";
import { useTranslation } from "react-i18next";
import useAuthorise from "../../../Hooks/UserManagement/useAuthUserManagementData";
import useDeauthorize from "../../../Hooks/UserManagement/useDeauthUserManagementData";

const Auth = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Fetch the selected account from Redux
  const selectedProfile = useSelector(
    (state) => state.instaEnroll.accTypeSelectedItem
  );

  const triggerSubMenuData = useSelector(
    (store) => store?.user?.triggerSubMenu
  );

  const menuId = triggerSubMenuData.menu_id;

  const globalActionId = useSelector(
    (store) => store.instaEnroll.globalActionsId
  );



  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [disableDeauthorize, setDisableDeauthorize] = useState(false);
  const [showAuthorizeButton, setShowAuthorizeButton] = useState(true);

  const user = useSelector((store) => store.user.items);
  const userId = user?.map((item) => item.user_id);
  const selectedMenu = useSelector((store) => store.menu.selectedMenuItem);

  const { authorize, isLoading } = useAuthorise();
  const { deauthorize, isDeauthLoading } = useDeauthorize();

  const isDeauthAllowed = selectedProfile
    ? !userId.includes(selectedProfile.created_userid) &&
      (selectedProfile.process_status === 2 ||
        selectedProfile.process_status === 5)
    : false;

  const handleAuthorize = async () => {
    const payload = {
      profile_id: selectedProfile.profile_id,
      inst_id: selectedProfile.inst_id,
      menu_id: menuId,
      action_id: globalActionId,
    };
    authorize(PROFILE_AUTH, payload, "/body/profile");
  };

  const handleDeauthorize = async () => {
    if (!isDeauthAllowed) {
      alert("Deauthorization not allowed based on current conditions.");
      return;
    }

    setDisableDeauthorize(true);
    setShowAuthorizeButton(false);

    if (!showFeedback) {
      setShowFeedback(true);
      setDisableDeauthorize(false);
    } else {
      const payload = {
        profile_id: selectedProfile.profile_id,
        inst_id: selectedProfile.inst_id,
        deauth_narration: feedback,
        menu_id: menuId,
        action_id: globalActionId,
      };
      console.log("Deauthorize Payload:", payload);

      try {
        await deauthorize(PROFILE_DEAUTH, payload, "/body/profile");
      } catch (error) {
        console.error("Deauthorization failed:", error);
      }
    }
  };

  return (
    <div className=" w-[78] h-[42rem] overflow-y-auto scrollbar scrollbar-thumb-scrollbar-color-gray  scrollbar-thumb-rounded-full scrollbar-w-2 ">
      <div className="flex justify-between items-center">
        <h2 className="flex flex-col p-5 font-roboto font-bold">
          {t(`${selectedMenu?.menu_name.toLowerCase()}`)}
        </h2>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col mb-2">
          {selectedProfile ? (
            <div className="border  mx-5 p-2 rounded-md shadow-md bg-color-white font-roboto text-md">
              <KeyValuePairs
                data={selectedProfile}
                excludeKeys={["menu_actions", "menu_actions_edited"]}
              />
            </div>
          ) : (
            <p>No profile data available</p>
          )}
        </div>

        <div className="py-4">
          <h1 className="flex items-start px-6  font-bold">
            {t("previous_rights")}
          </h1>
          <ViewTree selectedmenu={selectedProfile} />
        </div>

        {selectedProfile.menu_actions_edited && (
          <div className="h-auto py-4">
            <h1 className="flex items-start px-6 font-bold">
              {t("updated_rights")}
            </h1>
            <EditTree selectedmenu={selectedProfile} editable={false} />
          </div>
        )}

        <div className="px-5">
          {showFeedback && (
            <FeedbackInput
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          )}
        </div>

        <div className="flex justify-end p-5">
          {/* Authorize Button */}
          {showAuthorizeButton && (
            <button
              onClick={handleAuthorize}
              className="bg-gradient-to-br from-[#3d78b6] to-[#20205f] text-color-white px-4 py-2 rounded mr-2"
              disabled={isLoading}
            >
              {isLoading ? "Authorising..." : "Authorise"}
            </button>
          )}

          {/* Deauthorize Button */}
          <button
            onClick={handleDeauthorize}
            className="bg-color-red text-color-white px-4 py-2 rounded"
            disabled={disableDeauthorize || isDeauthLoading}
          >
            {showFeedback
              ? isDeauthLoading
                ? "Deauthorising..."
                : "Confirm Deauthorisation"
              : "Deauthorise"}
          </button>

          {/* Cancel Button */}
          <button
            onClick={() => navigate("/body/profile")}
            className="bg-color-dark-gray text-color-white px-4 py-2 rounded ml-2"
          >
            {t("cancel")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
