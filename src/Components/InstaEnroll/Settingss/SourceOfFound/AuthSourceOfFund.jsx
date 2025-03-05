import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SOURCE_OF_FUND_AUTH,
  SOURCE_OF_FUND_DEAUTH,
} from "../../../../Utils/Constant";
import { useSelector } from "react-redux";
import KeyValueDisplay from "../KeyValue";
import FeedbackInput from "../FeedbackTextBox";
import useAuthorise from "../../../../Hooks/InstaEnroll/useAuthorise";
import useDeauthorize from "../../../../Hooks/InstaEnroll/useDeauthorize";

const AuthSourcOfFund = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [disableDeauthorize, setDisableDeauthorize] = useState(false);
  const [showAuthorizeButton, setShowAuthorizeButton] = useState(true);

  const user = useSelector((store) => store.user.items);
  const userId = user?.map((item) => item.user_id);
  const selectedSourceOfFund = useSelector(
    (state) => state.instaEnroll.sourceOfFundSelectedItem
  );
  const navigate = useNavigate();

  const isDeauthAllowed = selectedSourceOfFund
    ? !userId.includes(
        selectedSourceOfFund.created_userid &&
          selectedSourceOfFund.process_status === 2
      ) ||
      !userId.includes(
        selectedSourceOfFund.created_userid_edited &&
          selectedSourceOfFund.process_status === 5
      )
    : false;

  const { authorize, isLoading } = useAuthorise();
  const { deauthorize, isDeauthLoading } = useDeauthorize();

  const handleAuthorize = () => {
    const payload = { srcoffund_id: selectedSourceOfFund.id };
    authorize(SOURCE_OF_FUND_AUTH, payload, "/body/sourceoffund/:id");
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
        srcfund_id: selectedSourceOfFund.id,
        deauth_narration: feedback,
      };
      console.log("Deauthorize Payload:", payload);

      try {
        await deauthorize(SOURCE_OF_FUND_DEAUTH, payload, "/body/sourceoffund/:id");
      } catch (error) {
        console.error("Deauthorization failed:", error);
      }
    }
  };

  return (
    <div className="w-[78] h-[42rem] overflow-y-auto scrollbar scrollbar-thumb-scrollbar-color-gray scrollbar-thumb-rounded-full scrollbar-w-2 relative">
      <div className="flex items-center justify-center pt-5 font-roboto">
        <div className="p-6 w-full rounded">
          <div className="mb-4">
            {selectedSourceOfFund ? (
              <div className="border p-4 rounded-md shadow-md bg-color-white">
                <KeyValueDisplay data={selectedSourceOfFund} />
              </div>
            ) : (
              <p>No source of fund data available</p>
            )}
          </div>

          {showFeedback && (
            <FeedbackInput
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          )}
        </div>
      </div>

      <div className="absolute  left-0 right-0 flex justify-end gap-2 px-4">
        {showAuthorizeButton && (
          <button
            onClick={handleAuthorize}
            className="bg-blue-500 text-color-white px-4 py-2 rounded mr-2"
            disabled={isLoading}
          >
            {isLoading ? "Authorising..." : "Authorise"}
          </button>
        )}
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
        <button
          onClick={() => navigate("/body/sourceoffund/:id")}
          className="bg-color-dark-gray text-color-white px-4 py-2 rounded ml-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AuthSourcOfFund;
