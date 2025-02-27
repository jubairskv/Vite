import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COMMISSION_AUTH, COMMISSION_DEAUTH } from "../../../../Utils/Constant";
import { useSelector } from "react-redux";
import KeyValueDisplay from "../KeyValue";
import FeedbackInput from "../FeedbackTextBox";
import useAuthorise from "../../../../Hooks/InstaEnroll/useAuthorise";
import useDeauthorize from "../../../../Hooks/InstaEnroll/useDeauthorize";

const AuthCustomerType = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [disableDeauthorize, setDisableDeauthorize] = useState(false);
  const [showAuthorizeButton, setShowAuthorizeButton] = useState(true);

  const navigate = useNavigate();

  const selectedCommission = useSelector(
    (store) => store.instaEnroll.commissionSelectedItem
  );
  const user = useSelector((store) => store.user.items);
  const userId = user?.map((item) => item.user_id);

  const isDeauthAllowed = selectedCommission
    ? !userId.includes(
        selectedCommission.created_userid &&
          selectedCommission.process_status === 2
      ) ||
      !userId.includes(
        selectedCommission.created_userid_edited &&
          selectedCommission.process_status === 5
      )
    : false;

  const { authorize, isLoading } = useAuthorise();
  const { deauthorize, isDeauthLoading } = useDeauthorize();

  const handleAuthorize = () => {
    const payload = { commission_id: selectedCommission.commission_id };
    authorize(COMMISSION_AUTH, payload, "/body/commission/:id");
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
        commission_id: selectedCommission.commission_id,
        deauth_narration: feedback,
      };

      try {
        await deauthorize(COMMISSION_DEAUTH, payload, "/body/commission/:id");
      } catch (error) {
        console.error("Deauthorisation failed:", error);
      }
    }
  };

  return (
    <div className="w-[78] h-[42rem] overflow-y-auto scrollbar scrollbar-thumb-scrollbar-color-gray scrollbar-thumb-rounded-full scrollbar-w-2">
      <div className="flex items-center justify-center pt-5">
        <div className="p-6 w-full rounded">
          <div className="mb-2">
            {selectedCommission ? (
              <div className="border p-4 rounded-md shadow-md bg-color-white">
                <KeyValueDisplay data={selectedCommission} />
              </div>
            ) : (
              <p>No customer type data available</p>
            )}
          </div>

          {showFeedback && (
            <FeedbackInput
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          )}

          <div className="bottom-5 left-auto right-0 flex justify-end  gap-0 px-4">
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
              onClick={() => navigate("/body/commission/:id")}
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

export default AuthCustomerType;
