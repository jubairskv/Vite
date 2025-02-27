import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ViewTree from "./ViewTreeStrcture";
import EditTree from "../EditPage/EditTreeStrcture";
import KeyValuePairs from "../../KeyValue";
import { useTranslation } from "react-i18next";

const ViewProfile = () => {
  const { t } = useTranslation();
  const selectedProfile = useSelector(
    (store) => store?.instaEnroll?.accTypeSelectedItem
  );
  const navigate = useNavigate();

  const selectedMenu = useSelector((store) => store.menu.selectedMenuItem);

  if (!selectedProfile) {
    return <div>No profile data available.</div>;
  }

  return (
    <div className=" w-[78] h-[42rem]  overflow-y-auto scrollbar scrollbar-thumb-scrollbar-color-gray  scrollbar-thumb-rounded-full scrollbar-w-2 ">
      <div className="flex justify-between items-center ">
        <h2 className="flex p-5 font-roboto text-md font-bold">
          {t(`${selectedMenu?.menu_name.toLowerCase()}`)}
        </h2>
        <div className="flex justify-end p-5">
          <button
            onClick={() => navigate("/body/profile")}
            className="bg-gradient-to-br from-[#3d78b6] to-[#20205f] text-color-white px-4 py-2 rounded font-roboto"
          >
            {t("back")}
          </button>
        </div>
      </div>

      <div className="border w-[78] h-auto mx-5  rounded-md shadow-md bg-color-white font-roboto text-md">
        <KeyValuePairs
          data={selectedProfile}
          excludeKeys={["menu_actions", "menu_actions_edited"]}
        />
      </div>

      <div className="h-auto py-4 font-roboto ">
        <h1 className="flex items-start px-6 font-bold">{t("rights")}</h1>
        <ViewTree selectedmenu={selectedProfile} editable={false} />
      </div>

      {selectedProfile.menu_actions_edited && (
        <div className="h-auto py-4">
          <h1 className="flex items-start px-6 font-bold">Updated Rights</h1>
          <EditTree selectedmenu={selectedProfile} editable={false} />
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
