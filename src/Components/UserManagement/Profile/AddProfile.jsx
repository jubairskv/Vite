//Addprofile
import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import ModuleData from "./TreeData/DynamicTree";
import { VIEW_INSTITUTION, PROFILE_ADD } from "../../../Utils/Constant";
import { useDispatch } from "react-redux";
import { setAddActions } from "../../../Redux/UserSlice";
import { useNavigate, Link } from "react-router-dom";
import ProfileForm from "./ProfileForm";
import useAddProfile from "../../../Hooks/UserManagement/useAddUserManagementData";
import useInstitutionData from "../../../Hooks/UserManagement/useInsititution";

const AddProfile = () => {
  const [profileName, setProfileName] = useState("");
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [errors, setErrors] = useState({});
  const [filteredModuleData, setFilteredModuleData] = useState([]);
  const [toggledMenus, setToggledMenus] = useState({});
  //const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle toggling of menus by menu_id
  const handleToggleMenu = (menuId) => {
    setToggledMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const token = useSelector((store) => store?.token?.token);
  const deviceId = useSelector((store) => store?.token?.deviceId);
  const user = useSelector((store) => store?.user?.items);
  const usertype = user.some((item) => item.user_type === 1);
  const Actions = useSelector((store) => store.user.addProfile);
  const userData = user.find((item) => item.menu_array);
  const menuList = userData?.menu_array || [];
  const filteredModules = useSelector((state) => state.user.filteredModules);

  const TreeData = useSelector((state) => state.user.treeDatas);

  const userModuleIds = useMemo(() => {
    return filteredModules?.map((moduleD) => moduleD.module_id);
  }, [filteredModules]);

  // Filtered menu list
  const filteredMenuList = useMemo(() => {
    return menuList.filter((menu) => userModuleIds.includes(menu.module_id));
  }, [menuList, userModuleIds]);

  const moduleIds = filteredModules
    ?.filter((item) => item.module_id === 1)
    ?.map((item) => item.module_id);

  const instname =
    menuList.find((menu) => menu.menu_name === "Institution")?.menu_name ||
    "Institution";

  const { institutions } = useInstitutionData({
    menuList,
    userData,
  });

  useEffect(() => {
    if (selectedInstitution) {
      const institution = institutions.find(
        (inst) => inst.institution_id === Number(selectedInstitution)
      );
      if (institution) {
        setFilteredModuleData(institution.module_list);
      } else {
        setFilteredModuleData([]);
      }
    } else {
      setFilteredModuleData([]);
    }
  }, [selectedInstitution, institutions]);

  const validateFields = () => {
    const errors = {};
    if (!profileName.trim()) {
      errors.profileName = "Profile Name is required";
    }
    if (usertype && !selectedInstitution) {
      errors.selectedInstitution = "Institution selection is required";
    }
    return errors;
  };

  const { addProfile } = useAddProfile();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const profileInfo = {
      profile_name: profileName,
      inst_id: Number(selectedInstitution),
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
    console.log(menuInfo);

    const myPayload = {
      profile_info: profileInfo,
      menu_info: menuInfo,
    };
    dispatch(setAddActions(myPayload));

    // Replace with the actual API URL
    await addProfile(myPayload, PROFILE_ADD, "/body/profile");
  };

  return (
    <div className="w-[78] h-[42rem] overflow-y-auto scrollbar scrollbar-thumb-scrollbar-color-gray scrollbar-thumb-rounded-full scrollbar-w-2 p-4">
      <div className="flex flex-col h-auto justify-between bg-color-white mt-10 rounded-lg">
        <ProfileForm
          profileName={profileName}
          setProfileName={setProfileName}
          selectedInstitution={selectedInstitution}
          setSelectedInstitution={setSelectedInstitution}
          institutions={institutions}
          errors={errors}
          onSubmit={handleSubmit}
          instname={instname}
          showInstitutionField={true}
        />

        {/* Module Data Section */}
        <div className="mt-6">
          <ModuleData moduleData={filteredModuleData} />
        </div>
      </div>
    </div>
  );
};

export default AddProfile;
