import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RELIGION_AUTH, RELIGION_DEAUTH } from "../../../../Utils/Constant";
import { useSelector } from "react-redux";
import KeyValueDisplay from "../KeyValue";
import FeedbackInput from "../FeedbackTextBox";
import useAuthorise from "../../../../Hooks/InstaEnroll/useAuthorise";
import useDeauthorize from "../../../../Hooks/InstaEnroll/useDeauthorize";

const AuthReligion = () => {
  const navigate = useNavigate();

  // Fetch the selected account from Redux
  const selectedReligion = useSelector(
    (state) => state.instaEnroll.religionSelectedItem
  );
  console.log("Selected religion in Auth Page:", selectedReligion);

  const token = useSelector((store) => store.token.token);
  console.log("token", token);

  const deviceId = useSelector((store) => store.token.deviceId);
  console.log(deviceId);

  const [showFeedback, setShowFeedback] = useState(false); // State to toggle feedback textarea
  const [feedback, setFeedback] = useState(""); // State to store feedback text
  const [disableDeauthorize, setDisableDeauthorize] = useState(false); // State to disable Deauthorize button
  const [showAuthorizeButton, setShowAuthorizeButton] = useState(true); // New state to control the visibility of the authorize button

  const user = useSelector((store) => store.user.items);
  const userId = user?.map((item) => item.user_id);

  const isDeauthAllowed = selectedReligion
    ? !userId.includes(
        selectedReligion.created_userid && selectedReligion.process_status === 2
      ) ||
      !userId.includes(
        selectedReligion.created_userid_editted &&
          selectedReligion.process_status === 5
      )
    : false;

  const { authorize, isLoading } = useAuthorise();
  const { deauthorize, isDeauthLoading } = useDeauthorize();

  const handleAuthorize = () => {
    const payload = { religion_id: selectedReligion.id };
    authorize(RELIGION_AUTH, payload, "/body/religion/:id");
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
        religion_id: selectedReligion.id,
        deauth_narration: feedback,
      };

      try {
        await deauthorize(RELIGION_DEAUTH, payload, "/body/religion/:id");
      } catch (error) {
        console.error("Deauthorization failed:", error);
      }
    }
  };

  return (
    <div className="w-[78] h-[42rem] overflow-y-auto scrollbar scrollbar-thumb-scrollbar-color-gray scrollbar-thumb-rounded-full scrollbar-w-2 relative font-roboto">
      <div className="flex items-center justify-center pt-5">
        <div className="p-6 w-full rounded">
          {/* Display selected account data */}
          <div className="mb-4">
            {selectedReligion ? (
              <div className="border p-4 rounded-md shadow-md bg-color-white">
                <KeyValueDisplay data={selectedReligion} />
              </div>
            ) : (
              <p>No religion data available</p>
            )}
          </div>

          {showFeedback && (
            <FeedbackInput
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          )}

          <div className="absolute  left-0 right-0 flex justify-end gap-2 px-4">
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
              onClick={() => navigate("/body/religion/:id")} // Go back to the account list page
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

export default AuthReligion;
