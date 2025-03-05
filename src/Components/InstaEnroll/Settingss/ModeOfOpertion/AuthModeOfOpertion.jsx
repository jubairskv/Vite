import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MODE_OF_OPERATION_AUTH,
  MODE_OF_OPERATION_DEAUTH,
} from "../../../../Utils/Constant";
import { useSelector } from "react-redux";
import KeyValueDisplay from "../KeyValue";
import FeedbackInput from "../FeedbackTextBox";
import useAuthorise from "../../../../Hooks/InstaEnroll/useAuthorise";
import useDeauthorize from "../../../../Hooks/InstaEnroll/useDeauthorize";

const AuthModeOfOperation = () => {
  const navigate = useNavigate();

  const selectedModeOfOpertion = useSelector(
    (state) => state.instaEnroll.modeOfOperationSelectedItem
  );

  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [disableDeauthorize, setDisableDeauthorize] = useState(false);
  const [showAuthorizeButton, setShowAuthorizeButton] = useState(true);
  const user = useSelector((store) => store.user.items);
  const userId = user?.map((item) => item.user_id);

  const isDeauthAllowed = selectedModeOfOpertion
    ? !userId.includes(
        selectedModeOfOpertion.created_userid &&
          selectedModeOfOpertion.process_status === 2
      ) ||
      !userId.includes(
        selectedModeOfOpertion.created_userid_edited &&
          selectedModeOfOpertion.process_status === 5
      )
    : false;

  const { authorize, isLoading, authError } = useAuthorise();
  const { deauthorize, isDeauthLoading } = useDeauthorize();

  const handleAuthorize = () => {
    const payload = { modeofopr_id: selectedModeOfOpertion.mode_id };
    authorize(MODE_OF_OPERATION_AUTH, payload, "/body/modeofoperation/:id");
  };

  const handleDeauthorize = async () => {
    if (!isDeauthAllowed) {
      alert(
        authError || "Deauthorization not allowed based on current conditions."
      );
      return;
    }

    setDisableDeauthorize(true);
    setShowAuthorizeButton(false);

    if (!showFeedback) {
      setShowFeedback(true);
      setDisableDeauthorize(false);
    } else {
      const payload = {
        modop_id: selectedModeOfOpertion.mode_id,
        deauth_narration: feedback,
      };

      deauthorize(MODE_OF_OPERATION_DEAUTH, payload, "/body/modeofoperation/:id");
    }
  };

  return (
    <div className="w-[78] h-[42rem] overflow-y-auto scrollbar scrollbar-thumb-scrollbar-color-gray scrollbar-thumb-rounded-full scrollbar-w-2 relative">
      <div className="flex items-center justify-center pt-5">
        <div className="p-6 w-full rounded">
          {/* Display selected account data */}
          <div className="mb-4">
            {selectedModeOfOpertion ? (
              <div className="border p-4 rounded-md shadow-md bg-color-white">
                <KeyValueDisplay data={selectedModeOfOpertion} />
              </div>
            ) : (
              <p>No mode of operation data available</p>
            )}
          </div>

          {showFeedback && (
            <FeedbackInput
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          )}

          <div className="left-0 right-0 flex justify-end gap-2 px-4">
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
              onClick={handleDeauthorize} // Handles both showing feedback and deauthorization
              className="bg-color-red text-color-white px-4 py-2 rounded"
              disabled={disableDeauthorize || isDeauthLoading}
            >
              {showFeedback
                ? isDeauthLoading
                  ? "Deauthorising..."
                  : "Confirm Deauthorization"
                : "Deauthorize"}
            </button>
            {/* Cancel Button */}
            <button
              onClick={() => navigate("/body/modeofoperation/:id")} // Go back to the account list page
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

export default AuthModeOfOperation;
