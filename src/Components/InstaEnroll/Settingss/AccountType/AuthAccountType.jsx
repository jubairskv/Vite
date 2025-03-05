import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ACCOUNT_TYPE_AUTH,
  ACCOUNT_TYPE_DEAUTH,
} from "../../../../Utils/Constant";
import { useSelector } from "react-redux";
import KeyValueDisplay from "../KeyValue";
import FeedbackInput from "../FeedbackTextBox";
import useAuthorise from "../../../../Hooks/InstaEnroll/useAuthorise";
import useDeauthorize from "../../../../Hooks/InstaEnroll/useDeauthorize";

const Auth = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [disableDeauthorize, setDisableDeauthorize] = useState(false);
  const [showAuthorizeButton, setShowAuthorizeButton] = useState(true);

  const selectedAccount = useSelector(
    (store) => store.instaEnroll.accTypeSelectedItem
  );

  const user = useSelector((store) => store.user.items);
  const userId = user.map((item) => item.user_id);
  const navigate = useNavigate();

  const isDeauthAllowed = selectedAccount
    ? !userId.includes(
        selectedAccount.created_userid && selectedAccount.process_status === 2
      ) ||
      !userId.includes(
        selectedAccount.created_userid_edited &&
          selectedAccount.process_status === 5
      )
    : false;

  const { authorize, isLoading } = useAuthorise();
  const { deauthorize, isDeauthLoading } = useDeauthorize();

  const handleAuthorize = () => {
    const payload = { accttype_id: selectedAccount.id };
    authorize(ACCOUNT_TYPE_AUTH, payload, "/body/accounttype/:id");
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
        accttype_id: selectedAccount.id,
        deauth_narration: feedback,
      };

      try {
        await deauthorize(ACCOUNT_TYPE_DEAUTH, payload, "/body/accounttype");
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
            {selectedAccount ? (
              <div className="border p-4 rounded-md shadow-md bg-color-white">
                <KeyValueDisplay data={selectedAccount} />
              </div>
            ) : (
              <p>No account data available</p>
            )}
          </div>

          {showFeedback && (
            <FeedbackInput
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          )}
          <div className=" bottom-5 left-auto right-0 flex justify-end gap-0 px-4">
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
                  : "Confirm Deauthorisation"
                : "Deauthorise"}
            </button>

            <button
              onClick={() => navigate("/body/accounttype/:id")}
              className="bg-color-dark-gray text-color-white  px-4 py-2 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
