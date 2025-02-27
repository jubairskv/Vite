import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import KeyValueDisplay from "../Settingss/KeyValue";

const ViewAgent = () => {
  const selectedAgent = useSelector(
    (store) => store.instaEnroll.agentSelectedItem
  );

  console.log(selectedAgent)

  const selectedMenu = useSelector((store) => store.menu.selectedMenuItem);

  const navigate = useNavigate();

  if (!selectedAgent) {
    return (
      <div className="font-roboto">No account sub type data available.</div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center font-roboto">
        <h2 className="flex p-5 font-bold">{selectedMenu?.menu_name}</h2>
        <div className="flex justify-end p-5">
          <button
            onClick={() => navigate("/body/agent/:id")}
            className="bg-gradient-to-br from-[#3d78b6] to-[#20205f] text-color-white px-4 py-2 rounded"
          >
            Back
          </button>
        </div>
      </div>

      <div className="border w-[78] h-auto mx-5 p-4 rounded shadow-md font-roboto bg-color-white">
        <KeyValueDisplay data={selectedAgent} />
      </div>
    </div>
  );
};

export default ViewAgent;
