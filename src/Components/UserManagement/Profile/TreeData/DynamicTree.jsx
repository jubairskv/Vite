import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTreeDatas } from "../../../../Redux/UserSlice";
import TreeNode from "./TreeNode";
import { createTreeDataFromModules } from "./TreeUtils";

// Main component for handling dynamic tree structure and rights toggling
const DynamicTree = ({ moduleData, menuActionsProfile }) => {
  const dispatch = useDispatch();
  const [treeData, setTreeData] = useState([]);
  const user = useSelector((state) => state.user.items);
  const filteredModules = useSelector((state) => state.user.filteredModules);

  const userMenuData = useMemo(
    () => user.flatMap((item) => item.menu_array),
    [user]
  );


  const menuActions = useMemo(
    () =>
      userMenuData?.map((item) =>
        item.actions?.map((action) => action.action_name)
      ),
    [userMenuData]
  );

  const userModuleIds = useMemo(
    () => filteredModules?.map((modules) => modules.module_id),
    [filteredModules]
  );

  const filteredMenuList = useMemo(() => {
    return userMenuData.filter((menu) =>
      userModuleIds.includes(menu.module_id)
    );
  }, [userMenuData, userModuleIds]);

  useEffect(() => {
    if (
      moduleData.length > 0 &&
      userMenuData.length > 0 &&
      menuActions.length > 0
    ) {
      const newTreeData = createTreeDataFromModules(
        moduleData,
        userMenuData,
        menuActions
      );
      setTreeData(newTreeData);
    }
  }, [moduleData, userMenuData, menuActions]);

  // Helper function to update rights for a specific node and propagate to children
  const updateRights = (nodes, nodeId, right, checked) => {
    return nodes?.map((node) => {
      if (node.id === nodeId) {
        const updatedChildren = checked
          ? updateRightsForChildren(node.children, right, checked)
          : unselectChildren(node.children, right);

        return {
          ...node,
          selectedRights: {
            ...node.selectedRights,
            [right]: checked,
          },
          children: updatedChildren,
        };
      }

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
        [right]: false,
      },
      children: unselectChildren(child.children, right),
    }));
  };

  // Helper function to check if all children have the same right selected
  const allChildrenHaveRight = (children, right) => {
    if (!children || children.length === 0) return false;
    return children.every((child) => child.selectedRights[right]);
  };

  // Propagate right changes to parent nodes
  const updateRightsForParents = (nodes, nodeId, right, checked) => {
    return nodes?.map((node) => {
      if (node.children && node.children.length > 0) {
        const updatedChildren = updateRightsForParents(
          node.children,
          nodeId,
          right,
          checked
        );

        // Check if all children have the same right after update
        const allChildrenSelected = allChildrenHaveRight(
          updatedChildren,
          right
        );

        return {
          ...node,
          selectedRights: {
            ...node.selectedRights,
            [right]: allChildrenSelected, // Toggle parent's right based on children
          },
          children: updatedChildren,
        };
      }
      return node;
    });
  };

  // Handle rights change for a specific node
  const handleRightsChange = (nodeId, right, checked) => {
    let updatedTree = updateRights(treeData, nodeId, right, checked);
    updatedTree = updateRightsForParents(updatedTree, nodeId, right, checked); // Update parent nodes based on children
    setTreeData(updatedTree);
    dispatch(setTreeDatas(updatedTree)); // Dispatch updated tree data to Redux
  };

  return (
    <div>
      {treeData?.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          onRightsChange={handleRightsChange}
        
        />
      ))}
    </div>
  );
};

export default DynamicTree;
