import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTreeDatas } from "../../../../Redux/UserSlice";
import TreeNode from "../ViewPage/ViewTreeNode";
import { createTreeDataFromModulesUpdate } from "./EditUtils";

const DynamicTreeEdit = ({ moduleData, menuActionsProfile, isEditable }) => {
  const dispatch = useDispatch();
  const [treeData, setTreeData] = useState([]);

  const menuActionslist = menuActionsProfile?.menu_actions_edited || []; 

  const user = useSelector((state) => state.user.items);
  const filteredModules = useSelector((state) => state.user.filteredModules);

  // Flatten user data to get menu arrays
  const userMenuData = useMemo(() => user?.flatMap((item) => item.menu_array), [user]);
  console.log(userMenuData)

  // Get actions associated with menu items
  const menuActions = useMemo(
    () => userMenuData.map((item) => item.actions?.map((action) => action.action_name)),
    [userMenuData]
  );
  console.log(menuActions)

  // Filtered menu list based on module IDs
  const userModuleIds = useMemo(
    () => filteredModules?.map((modules) => modules.module_id),
    [filteredModules]
  );

  // Create tree data structure from modules
  useEffect(() => {
    if (moduleData.length > 0 && userMenuData.length > 0 && menuActions.length > 0) {
      const newTreeData = createTreeDataFromModulesUpdate(
        moduleData,
        userMenuData,
        menuActions,
        menuActionslist  // Pass the hardcoded data
      );
      setTreeData(newTreeData);
    }
  }, [moduleData, userMenuData, menuActions]);

  // Helper function to update rights for a specific node and propagate to children
  const updateRights = (nodes, nodeId, right, checked) => {
    return nodes?.map((node) => {
      // If it's the node we are updating
      if (node.id === nodeId) {
        //based on node id only it will pass the data when parent and children
        const updatedChildren = checked
          ? updateRightsForChildren(node.children, right, checked)
          : unselectChildren(node.children, right);

        return {
          ...node,
          selectedRights: {
            ...node.selectedRights,
            [right]: checked, // Update the right for this node
          },
          children: updatedChildren, // Update children accordingly
        };
      }

      // Recursively update children
      return {
        ...node,
        children: node.children
          ? updateRights(node.children, nodeId, right, checked)
          : node.children,
      };
    });
  };

  // Propagate right changes to all children
  const updateRightsForChildren = (children, right, checked) => {
    if (!children) return children;

    return children?.map((child) => ({
      ...child,
      selectedRights: {
        ...child.selectedRights,
        [right]: checked,
      },
      children: updateRightsForChildren(child.children, right, checked),
    }));
  };

  // Unselect a specific right for all children
  const unselectChildren = (children, right) => {
    if (!children) return children;

    return children?.map((child) => ({
      ...child,
      selectedRights: {
        ...child.selectedRights,
        [right]: false, // Unselect the specific right for this child
      },
      children: unselectChildren(child.children, right),
    }));
  };

  

  // Handle rights change for a specific node
  const handleRightsChange = (nodeId, right, checked) => {
    const updatedTree = updateRights(treeData, nodeId, right, checked);
    setTreeData(updatedTree);
    dispatch(setTreeDatas(updatedTree)); // Dispatch updated tree data to Redux

    // Log the updated tree data
    console.log("Updated Tree Data:", updatedTree);

    // Find and log the specific node that was toggled
    const toggledNode = updatedTree.find(node => node.id === nodeId);
    console.log("Toggled Node:", toggledNode);
  };

  return (
    <div>
      {treeData?.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          onRightsChange={handleRightsChange}
          isEditable={isEditable}
        />
      ))}
    </div>
  );
};

export default DynamicTreeEdit;
