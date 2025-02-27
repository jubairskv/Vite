export const createTreeDataFromModules = (modules, menuItems, actions) => {
    return modules?.map((moduleD, index) => ({
      id: moduleD.module_id,                                                  //this code is for strcture the data formate
      name: moduleD.module_name,
      rights:actions[index] , // Default module-level rights
      selectedRights: {
        Add: false,
        View: false,
        Edit: false,
        Delete: false,
        Authorise: false,
        Self:false
      },
      children: menuItems
        ?.filter((item) => item.module_id === moduleD.module_id)
        ?.map((item) => ({
          id: item.menu_id,
          name: item.menu_name,
          rights: item.actions?.map((item) => item.action_name), // Use dynamic actions or default
          selectedRights: {
            Add: false,
            View: false,
            Edit: false,
            Delete: false,
            Authorise: false,
            Self: false,
          },
          children: item.children || [], // Handle any children recursively
        })),
    }));
  };