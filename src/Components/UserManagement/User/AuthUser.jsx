import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { USER_AUTH, USER_DEAUTH } from "../../../Utils/Constant";
import { useSelector } from "react-redux";
import KeyValueDisplay from "../../InstaEnroll/Settingss/KeyValue";
import FeedbackInput from "../../InstaEnroll/Settingss/FeedbackTextBox";
import useAuthorise from "../../../Hooks/UserManagement/useAuthUserManagementData";
import useDeauthorize from "../../../Hooks/UserManagement/useDeauthUserManagementData";

const AuthUser = () => {
  const navigate = useNavigate();

  const selectedUser = useSelector(
    (store) => store.userManagements.userSelItem
  );

  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");

  const [disableDeauthorize, setDisableDeauthorize] = useState(false);
  const [showAuthorizeButton, setShowAuthorizeButton] = useState(true);

  const user = useSelector((store) => store.user.items);
  const userId = user?.map((item) => item.user_id);
  const selectedMenu = useSelector((store) => store.menu.selectedMenuItem);

  const triggerSubMenuData = useSelector(
    (store) => store?.user?.triggerSubMenu
  );

  const globalActionId = useSelector(
    (store) => store.instaEnroll.globalActionsId
  );

  const menuId = triggerSubMenuData?.menu_id;

  const { authorize, isLoading } = useAuthorise();
  const { deauthorize, isDeauthLoading } = useDeauthorize();

  const isDeauthAllowed = selectedUser
    ? !userId.includes(selectedUser.created_userid) &&
      (selectedUser.process_status === 2 || selectedUser.process_status === 5)
    : false;

  const handleAuthorize = async () => {
    const payload = {
      user_id: selectedUser?.user_id,
      inst_id: selectedUser?.institution_id,
      menu_id: menuId,
      action_id: globalActionId,
    };
    console.log(payload);

    authorize(USER_AUTH, payload, "/body/user/:id");
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
        user_id: selectedUser?.user_id,
        inst_id: selectedUser?.institution_id,
        deauth_narration: feedback,
        menu_id: menuId,
        action_id: globalActionId,
      };
      console.log("Deauthorize Payload:", payload);

      try {
        await deauthorize(USER_DEAUTH, payload, "/body/user/:id");
      } catch (error) {
        console.error("Deauthorization failed:", error);
      }
    }
  };

  return (
    <div className="">
      <div className="flex justify-between items-center font-roboto">
        <h2 className="flex flex-col p-5 font-roboto font-bold">
          {selectedMenu.menu_name}
        </h2>
      </div>

      <div className="w-[78] h-[32rem] overflow-y-auto scrollbar scrollbar-thumb-scrollbar-color-gray  scrollbar-thumb-rounded-full scrollbar-w-2 ">
        <div className="flex flex-col mb-2">
          {selectedUser ? (
            <div className="border mx-5 p-2 rounded-md shadow-md bg-color-white font-roboto ">
              <KeyValueDisplay data={selectedUser} />
            </div>
          ) : (
            <p>No user data available</p>
          )}
        </div>

        <div className="px-5 font-roboto">
          {showFeedback && (
            <FeedbackInput
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="fixed bottom-5 left-auto right-3 flex justify-center gap-2 px-4">
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
            onClick={handleDeauthorize} // Handles both showing feedback and deauthorization
            className="bg-color-red text-color-white px-4 py-2 rounded font-roboto"
            disabled={disableDeauthorize}
          >
            {showFeedback ? "Confirm Deauthorization" : "Deauthorize"}
          </button>

          {/* Cancel Button */}
          <button
            onClick={() => navigate("/body/user/:id")} // Go back to the account list page
            className="bg-color-dark-gray text-color-white px-4 py-2 rounded ml-2 font-roboto"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthUser;
