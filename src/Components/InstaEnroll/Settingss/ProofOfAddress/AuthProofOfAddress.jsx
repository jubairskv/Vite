import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PROOF_OF_ADDRESS_AUTH,
  PROOF_OF_ADDRESS_DEAUTH,
} from "../../../../Utils/Constant";
import { useSelector } from "react-redux";
import KeyValueDisplay from "../KeyValue";
import FeedbackInput from "../FeedbackTextBox";
import useAuthorise from "../../../../Hooks/InstaEnroll/useAuthorise";
import useDeauthorize from "../../../../Hooks/InstaEnroll/useDeauthorize";

const AuthProofOfAddress = () => {
  const navigate = useNavigate();

  const selectedAddressProof = useSelector(
    (store) => store.instaEnroll.addProofSelectedItem
  );

  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [disableDeauthorize, setDisableDeauthorize] = useState(false);
  const [showAuthorizeButton, setShowAuthorizeButton] = useState(true);

  const user = useSelector((store) => store.user.items);
  const userId = user?.map((item) => item.user_id);

  const isDeauthAllowed = selectedAddressProof
    ? !userId.includes(
        selectedAddressProof.created_userid &&
          selectedAddressProof.process_status === 2
      ) ||
      !userId.includes(
        selectedAddressProof.created_userid_edited &&
          selectedAddressProof.process_status === 5
      )
    : false;

  const { authorize, isLoading } = useAuthorise();
  const { deauthorize, isDeauthLoading } = useDeauthorize();

  const handleAuthorize = () => {
    const payload = { addressproof_id: selectedAddressProof.addr_doc_id };
    authorize(PROOF_OF_ADDRESS_AUTH, payload, "/body/proofofaddress/:id");
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
        addressproof_id: selectedAddressProof.addr_doc_id,
        deauth_narration: feedback,
      };
      console.log("Deauthorize Payload:", payload);

      try {
        await deauthorize(
          PROOF_OF_ADDRESS_DEAUTH,
          payload,
          "/body/proofofaddress/:id"
        );
      } catch (error) {
        console.error("Deauthorization failed:", error);
      }
    }
  };

  return (
    <div className="w-[78] h-[42rem] overflow-y-auto scrollbar scrollbar-thumb-scrollbar-color-gray scrollbar-thumb-rounded-full scrollbar-w-2 relative">
      <div className="flex items-center justify-center pt-5">
        <div className="p-6 w-full rounded">
          <div className="mb-4">
            {selectedAddressProof ? (
              <div className="border p-4 rounded-md shadow-md bg-color-white">
                <KeyValueDisplay data={selectedAddressProof} />
              </div>
            ) : (
              <p>No Address Proof data available</p>
            )}
          </div>

          {showFeedback && (
            <FeedbackInput
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          )}

          <div className="absolute  left-0 right-0 flex justify-end gap-2 px-4 ">
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
                  : "Confirm Deauthorisation"
                : "Deauthorise"}
            </button>

            {/* Cancel Button */}
            <button
              onClick={() => navigate("/body/proofofaddress/:id")} // Go back to the account list page
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

export default AuthProofOfAddress;
