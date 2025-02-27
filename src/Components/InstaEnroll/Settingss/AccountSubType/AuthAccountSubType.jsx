import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ACCOUNT_SUB_TYPE_AUTH,
  ACCOUNT_SUB_TYPE_DEAUTH,
} from "../../../../Utils/Constant";
import { useSelector } from "react-redux";
import KeyValueDisplay from "../KeyValue";
import FeedbackInput from "../FeedbackTextBox";
import useAuthorise from "../../../../Hooks/InstaEnroll/useAuthorise";
import useDeauthorize from "../../../../Hooks/InstaEnroll/useDeauthorize";

const AuthAccountSubType = () => {

  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [disableDeauthorize, setDisableDeauthorize] = useState(false);
  const [showAuthorizeButton, setShowAuthorizeButton] = useState(true);

  const navigate = useNavigate();

  const user = useSelector((store) => store.user.items);
  const userId = user?.map((item) => item.user_id);
  const selectedAccountsubType = useSelector(
    (state) => state.instaEnroll.accSubTypeSelectedItem
  );

  const isDeauthAllowed = selectedAccountsubType
    ? !userId.includes(
        selectedAccountsubType.created_userid &&
          selectedAccountsubType.process_status === 2
      ) ||
      !userId.includes(
        selectedAccountsubType.created_userid_edited &&
          selectedAccountsubType.process_status === 5
      )
    : false;

  const { authorize, isLoading } = useAuthorise();
  const { deauthorize, isDeauthLoading } = useDeauthorize();

  const handleAuthorize = () => {
    const payload = { acctsubtype_id: selectedAccountsubType.id };
    authorize(ACCOUNT_SUB_TYPE_AUTH, payload, "/body/accountsubtype/:id");
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
        acctsubtype_id: selectedAccountsubType.id,
        deauth_narration: feedback,
      };
      console.log("Deauthorize Payload:", payload);

      try {
        await deauthorize(
          ACCOUNT_SUB_TYPE_DEAUTH,
          payload,
          "/body/accountsubtype/:id"
        );
      } catch (error) {
        console.error("Deauthorization failed:", error);
      }
    }
  };

  return (
    <div className="w-[78] h-[42rem] overflow-y-auto scrollbar scrollbar-thumb-scrollbar-color-gray scrollbar-thumb-rounded-full scrollbar-w-2">
      <div className="flex items-center justify-center pt-1 font-roboto">
        <div className="p-6 w-full  rounded">
          {/* Display selected account data */}
          <div className="mb-2">
            {selectedAccountsubType ? (
              <div className="border p-4 rounded-md shadow-md bg-color-white">
                <KeyValueDisplay data={selectedAccountsubType} />
              </div>
            ) : (
              <p>No Account Sub Type data available</p>
            )}
          </div>

          {showFeedback && (
            <FeedbackInput
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          )}
          <div className=" bottom-5 left-auto right-0 flex justify-end gap-0 px-4">
            {/* Authorize Button */}
            {showAuthorizeButton && (
              <button
                onClick={handleAuthorize}
                className="bg-blue-500 text-color-white px-4 py-2 rounded mr-2"
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
              onClick={() => navigate("/body/accountsubtype/:id")}
              className="bg-color-dark-gray text-color-white px-4 py-2 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthAccountSubType;
