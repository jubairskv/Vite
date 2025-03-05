import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PROOF_OF_IDENTITY_AUTH,
  PROOF_OF_IDENTITY_DEAUTH,
} from "../../../../Utils/Constant";
import { useSelector } from "react-redux";
import KeyValueDisplay from "../KeyValue";
import FeedbackInput from "../FeedbackTextBox";
import useAuthorise from "../../../../Hooks/InstaEnroll/useAuthorise";
import useDeauthorize from "../../../../Hooks/InstaEnroll/useDeauthorize";

const AuthProofOfIdentity = () => {
  const navigate = useNavigate();

  const selectedProofOfIdentity = useSelector(
    (state) => state.instaEnroll.proofOfIdentitySelectedItem
  );

  const token = useSelector((store) => store.token.token);

  const deviceId = useSelector((store) => store.token.deviceId);
  console.log(deviceId);

  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [disableDeauthorize, setDisableDeauthorize] = useState(false);
  const [showAuthorizeButton, setShowAuthorizeButton] = useState(true);

  const user = useSelector((store) => store.user.items);
  const userId = user?.map((item) => item.user_id);

    const isDeauthAllowed = selectedProofOfIdentity
      ? !userId.includes(
          selectedProofOfIdentity.created_userid &&
            selectedProofOfIdentity.process_status === 2
        ) ||
        !userId.includes(
          selectedProofOfIdentity.created_userid_editted &&
            selectedProofOfIdentity.process_status === 5
        )
      : false;

  const { authorize, isLoading } = useAuthorise();
  const { deauthorize, isDeauthLoading } = useDeauthorize();

  const handleAuthorize = () => {
    const payload = { idproof_id: selectedProofOfIdentity.doc_id };
    authorize(PROOF_OF_IDENTITY_AUTH, payload, "/body/proofofidentity/:id");
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
        idproof_id: selectedProofOfIdentity.doc_id,
        deauth_narration: feedback,
      };

      try {
        await deauthorize(
          PROOF_OF_IDENTITY_DEAUTH,
          payload,
          "/body/proofofidentity/:id"
        );
      } catch (error) {
        console.error("Deauthorization failed:", error);
      }
    }
  };

  return (
    <div className="w-[78] h-[42rem] overflow-y-auto scrollbar scrollbar-thumb-scrollbar-color-gray scrollbar-thumb-rounded-full scrollbar-w-2">
      <div className="flex items-center justify-center pt-5">
        <div className="p-6 w-full rounded">
          {/* Display selected account data */}
          <div className="mb-4">
            {selectedProofOfIdentity ? (
              <div className="border p-4 rounded-md shadow-md bg-color-white">
                <KeyValueDisplay data={selectedProofOfIdentity} />
              </div>
            ) : (
              <p>No proof of identity data available</p>
            )}
          </div>

          {showFeedback && (
            <FeedbackInput
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          )}

          <div className="bottom-5 left-auto right-0 flex justify-end gap-2 px-4">
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
                  : "Confirm Deauthorization"
                : "Deauthorize"}
            </button>

            {/* Cancel Button */}
            <button
              onClick={() => navigate("/body/proofofidentity/:id")}
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

export default AuthProofOfIdentity;
