import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import KeyValueDisplay from "../../InstaEnroll/Settingss/KeyValue";

const ViewUser = () => {
  const selectedUser = useSelector(
    (store) => store.userManagements.userSelItem
  );
  
  const navigate = useNavigate();

  const selectedMenu = useSelector((store) => store.menu.selectedMenuItem);

  if (!selectedUser) {
    return <div className="font-roboto">No user data available.</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center ">
        <h2 className="flex p-5 font-bold">{selectedMenu.menu_name}</h2>
        <div className="flex justify-end p-5">
          <button
            onClick={() => navigate("/body/user/:id")}
            className="bg-gradient-to-br from-[#3d78b6] to-[#20205f] text-color-white px-4 py-2 rounded"
          >
            Back
          </button>
        </div>
      </div>

      <div className="border w-[78] h-auto mx-5 p-2 rounded-md shadow-md bg-color-white font-roboto">
        <KeyValueDisplay data={selectedUser} />
      </div>
    </div>
  );
};

export default ViewUser;
