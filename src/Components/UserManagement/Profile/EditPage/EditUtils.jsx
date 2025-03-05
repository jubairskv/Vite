export const createTreeDataFromModulesUpdate = (modules, menuItems, actions, menuActionslist) => {
    // Create a lookup for menu actions
    const ActionsLookup = menuActionslist?.reduce((acc, item) => {
      acc[item.menu_id] = item.actions;
      console.log(acc)
      return acc;
    }, {});
  
    // Helper function to determine if a right is selected at the module level based on the menu actions  and its look the actions
    const isModuleRightSelected = (menuChildren, right) => {
      return menuChildren.every((menu) => menu.selectedRights[right]);
    };
  
    return modules?.map((moduleD, index) => {
      // Generate menu children for each module
      const children = menuItems
        ?.filter((item) => item.module_id === moduleD.module_id)
        ?.map((menuItem) => {
          const menuActions = ActionsLookup[menuItem.menu_id] || [];
  
          return {
            id: menuItem.menu_id,
            name: menuItem.menu_name,
            rights: menuItem?.actions?.map((action) => action.action_name), // Use dynamic actions or default
            selectedRights: {
              Add: menuActions.includes(1),
              View: menuActions.includes(2),
              Edit: menuActions.includes(3),
              Delete: menuActions.includes(4),
              Authorise: menuActions.includes(5),
              Self: false,
            },
            children: menuItem.children || [], // Handle any children recursively
          };
        });
  
      // Now determine which module-level rights should be selected based on its children
      const selectedRights = {
        Add: isModuleRightSelected(children, "Add"),
        View: isModuleRightSelected(children, "View"),
        Edit: isModuleRightSelected(children, "Edit"),
        Delete: isModuleRightSelected(children, "Delete"),
        Authorise: isModuleRightSelected(children, "Authorise"),
        Self: false,
      };
  
      return {
        id: moduleD.module_id, // Structure the data format
        name: moduleD.module_name,
        rights: actions[index], // Default module-level rights
        selectedRights, // Module's selected rights are updated based on its children (menus)
        children,
      };
    });
  };