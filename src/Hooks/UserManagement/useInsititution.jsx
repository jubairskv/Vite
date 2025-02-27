import { useState, useEffect } from "react";
import { VIEW_INSTITUTION } from "../../Utils/Constant";
import { useSelector } from "react-redux";

const useInstitutionData = ({ menuList, userData }) => {
  const [insData, setInsData] = useState(null);
  const [institutions, setInstitutions] = useState([]);
  const token = useSelector((store) => store.token.token);
  const deviceId = useSelector((store) => store.token.deviceId);

  useEffect(() => {
    if (!userData) {
      console.error("No user data found");
      return;
    }

    const institutionMenu = menuList.find(
      (menu) => menu.menu_name === "Institution"
    );

    if (!institutionMenu) {
      console.error("No institution menu found");
      return;
    }

    const filteredActions = institutionMenu.actions.filter(
      (action) => action.action_id === 2
    );

    if (filteredActions.length === 0) {
      console.error("No actions with action_id 2 found");
      return;
    }

    const actionId = filteredActions[0].action_id;

    const menuData = {
      menu_info: {
        menu_id: institutionMenu.menu_id,
        action_id: actionId,
      },
    };

    const fetchProfileData = async () => {
      const apiUrl = VIEW_INSTITUTION;

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            DeviceID: deviceId,
          },
          body: JSON.stringify(menuData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setInsData(data);
        setInstitutions(data.menu_array);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [menuList, userData, token, deviceId]);

  return { insData, institutions };
};

export default useInstitutionData;
