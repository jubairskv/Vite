import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAddActions } from "../../../Redux/UserSlice";
import { useNavigate } from "react-router-dom";
import ProfileForm from "./ProfileForm";
import ViewTree from "./ViewPage/ViewTreeStrcture";
import useEditProfile from "../../../Hooks/UserManagement/useEditUserManagementData";
import { PROFILE_EDIT } from "../../../Utils/Constant";

const EditProfile = () => {
  const [profileName, setProfileName] = useState("");
  const [errors, setErrors] = useState({});
  const [filteredModuleData, setFilteredModuleData] = useState([]);
  const [toggledMenus, setToggledMenus] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle toggling of menus by menu_id
  const handleToggleMenu = (menuId) => {
    setToggledMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };


  const user = useSelector((store) => store?.user?.items);
  const Actions = useSelector((store) => store.user.addProfile);
  const userData = user.find((item) => item.menu_array);
  const menuList = userData?.menu_array || [];
  const filteredModules = useSelector((state) => state.user.filteredModules);
  const selectedProfile = useSelector(
    (state) => state.instaEnroll.accTypeSelectedItem
  );

  const TreeData = useSelector((state) => state.user.treeDatas);

  const userModuleIds = useMemo(() => {
    return filteredModules?.map((moduleD) => moduleD.module_id);
  }, [filteredModules]);

  // Filtered menu list
  const filteredMenuList = useMemo(() => {
    return menuList.filter((menu) => userModuleIds.includes(menu.module_id));
  }, [menuList, userModuleIds]);

  useEffect(() => {
    if (!selectedProfile) {
      setFilteredModuleData([]);
    } else {
      const filteredMenus = menuList.filter(
        (menu) => menu.institution_id === Number(selectedProfile)
      );
      setFilteredModuleData(filteredMenus);
    }
  }, [selectedProfile, menuList]);

  const validateFields = () => {
    const errors = {};
    if (!profileName.trim()) {
      errors.profileName = "Profile Name is required";
    }
    return errors;
  };

  const { editProfile, loading, error } = useEditProfile();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const profileInfo = {
      profile_id: selectedProfile?.profile_id,
      profile_name: profileName,
      inst_id: 1,
    };

    // Recursive function to collect selected menus with actions
    const collectMenuInfo = (menu, isChild = false) => {
      // Collect selected rights for the menu
      const selectedRights = Object.keys(menu.selectedRights || {})
        ?.filter((right) => menu.selectedRights[right]) // Only include selected actions
        ?.map((right) => {
          switch (right.toLowerCase()) {
            case "add":
              return 1;
            case "view":
              return 2;
            case "edit":
              return 3;
            case "delete":
              return 4;
            case "authorise":
              return 5;
            case "self":
              return 6;
            default:
              return null;
          }
        })
        .filter(Boolean);

      // Recursively collect info for child menus
      const childMenus = menu.children || [];
      const childMenuInfo = childMenus.flatMap((childMenu) =>
        collectMenuInfo(childMenu, true)
      ); // Handle children recursively

      // If this is a child menu, include it only if it has selected rights
      if (isChild && selectedRights.length > 0) {
        return [
          { menu_id: menu.id, actions: selectedRights, is_configuration: 2 },
          ...childMenuInfo,
        ];
      }

      // If this is a module or a parent menu, only include child menus if it has selected rights
      if (!isChild) {
        return childMenuInfo;
      }

      return [];
    };

    // Collect the menu info from the tree structure
    const menuInfo = TreeData.flatMap((menu) =>
      collectMenuInfo(menu, false)
    ).filter((menu) => menu.actions && menu.actions.length > 0);

    const myPayload = {
      profile_info: profileInfo,
      menu_info: menuInfo,
    };
    dispatch(setAddActions(myPayload));
    navigate("/body/profile");
    console.log(myPayload);

    // Replace with the actual API URL
    await editProfile(myPayload,  PROFILE_EDIT);
  };

  return (
    <div className="w-[78] h-[42rem] overflow-y-auto scrollbar scrollbar-thumb-scrollbar-color-gray scrollbar-thumb-rounded-full scrollbar-w-2">
      <div className="flex flex-col h-auto justify-between ">
        <ProfileForm
          profileName={profileName}
          setProfileName={setProfileName}
          errors={errors}
          onSubmit={handleSubmit}
          selectedProfile={selectedProfile}
          showInstitutionField={false}
        />

        <div className="mt-6">
          <ViewTree selectedmenu={selectedProfile} isEditable={true} />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
