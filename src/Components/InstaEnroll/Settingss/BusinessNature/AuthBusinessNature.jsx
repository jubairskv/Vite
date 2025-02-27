import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BUSINESS_AUTH, BUSINESS_DEAUTH } from "../../../../Utils/Constant";
import useAuthorise from "../../../../Hooks/InstaEnroll/useAuthorise";
import useDeauthorize from "../../../../Hooks/InstaEnroll/useDeauthorize";
import KeyValueDisplay from "../KeyValue";
import FeedbackInput from "../FeedbackTextBox";

const AuthBusinessNature = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [disableDeauthorize, setDisableDeauthorize] = useState(false);
  const [showAuthorizeButton, setShowAuthorizeButton] = useState(true);

  const user = useSelector((store) => store?.user?.items);
  const userId = user?.map((item) => item?.user_id);
  const selectedBusinessNature = useSelector(
    (store) => store.instaEnroll.businessNatureSelectedItem
  );

  const navigate = useNavigate();

  const isDeauthAllowed = selectedBusinessNature
    ? !userId.includes(
        selectedBusinessNature.created_userid &&
          selectedBusinessNature.process_status === 2
      ) ||
      !userId.includes(
        selectedBusinessNature.created_userid_edited &&
          selectedBusinessNature.process_status === 5
      )
    : false;

  const { authorize, isLoading } = useAuthorise();
  const { deauthorize, isDeauthLoading } = useDeauthorize();

  const handleAuthorize = () => {
    const payload = { business_id: selectedBusinessNature.id };
    authorize(BUSINESS_AUTH, payload, "/body/businessnature/:id");
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
        business_id: selectedBusinessNature.id,
        deauth_narration: feedback,
      };
      console.log("Deauthorize Payload:", payload);

      try {
        await deauthorize(BUSINESS_DEAUTH, payload, "/body/businessnature/:id");
      } catch (error) {
        console.error("Deauthorization failed:", error);
      }
    }
  };

  return (
    <div className="w-[78] h-[42rem] overflow-y-auto scrollbar scrollbar-thumb-scrollbar-color-gray scrollbar-thumb-rounded-full scrollbar-w-2">
      <div className="flex items-center justify-center pt-5">
        <div className="p-6 w-full  rounded">
          <div className="mb-4">
            {selectedBusinessNature ? (
              <div className="border p-4 rounded bg-color-white shadow-md">
                <KeyValueDisplay data={selectedBusinessNature} />
              </div>
            ) : (
              <p>No business nature data available</p>
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
                  : "Confirm Deauthorisation"
                : "Deauthorize"}
            </button>
            {/* Cancel Button */}
            <button
              onClick={() => navigate("/body/businessnature/:id")}
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

export default AuthBusinessNature;
