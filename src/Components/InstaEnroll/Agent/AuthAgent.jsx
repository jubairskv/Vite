import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AGENT_AUTH, AGENT_DEAUTH } from "../../../Utils/Constant";
import { useSelector } from "react-redux";
import KeyValueDisplay from "../Settingss/KeyValue";
import FeedbackInput from "../Settingss/FeedbackTextBox";
import useAuthoriseAgent from "../../../Hooks/InstaEnroll/useAuthAgent";
import useDeauthorizeAgent from "../../../Hooks/InstaEnroll/useDeauthorize";

const AuthAgent = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [disableDeauthorize, setDisableDeauthorize] = useState(false);
  const [showAuthorizeButton, setShowAuthorizeButton] = useState(true);

  const navigate = useNavigate();

  const user = useSelector((store) => store.user.items);

  const userId = user?.map((item) => item.user_id);
  const selectedAgent = useSelector(
    (store) => store.instaEnroll.agentSelectedItem
  );

  const isDeauthAllowed = selectedAgent
    ? !userId.includes(
        selectedAgent.created_userid && selectedAgent.process_status === 2
      ) ||
      !userId.includes(
        selectedAgent.created_userid_edited &&
          selectedAgent.process_status === 5
      )
    : false;

  const { authorize, isLoading } = useAuthoriseAgent();
  const { deauthorize, isDeauthLoading } = useDeauthorizeAgent();

  const handleAuthorize = () => {
    const payload = { agent_id: selectedAgent.agent_id };
    authorize(AGENT_AUTH, payload, "/body/agent/:id");
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
        agent_id: selectedAgent.agent_id,
        deauth_narration: feedback,
      };

      try {
        await deauthorize(AGENT_DEAUTH, payload, "/body/agent/:id");
      } catch (error) {
        console.error("Deauthorization failed:", error);
      }
    }
  };

  return (
    <div className="w-[78] h-[42rem] overflow-y-auto scrollbar scrollbar-thumb-scrollbar-color-gray scrollbar-thumb-rounded-full scrollbar-w-2">
      <div className="flex items-center justify-center pt-1 font-roboto">
        <div className="p-6 w-full  rounded">
          {/* Display selected agent data */}
          <div className="mb-2">
            {selectedAgent ? (
              <div className="border p-4 rounded-md shadow-md bg-color-white">
                <KeyValueDisplay data={selectedAgent} />
              </div>
            ) : (
              <p>No Agent data available</p>
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
              onClick={() => navigate("/body/agent")}
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

export default AuthAgent;
