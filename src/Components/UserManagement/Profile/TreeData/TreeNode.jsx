import React, { useState } from "react";
import { Switch, FormControlLabel, IconButton, Collapse } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { BsCaretRight } from "react-icons/bs";

const TreeNode = ({ node, onRightsChange }) => {
  const [open, setOpen] = useState(false);

  const handleRightChange = (right, checked) => {
    onRightsChange(node.id, right, checked);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="flex flex-col mx-5  mb-2 border  rounded-md bg-color-white font-roboto">
      <div className="flex w-[72rem] items-center justify-between cursor-pointer p-2 ">
        <div className="flex items-center">
          <div className="flex-shrink-0  ">
            {node.children && node.children.length > 0 ? (
              <IconButton onClick={handleToggle}>
                {open ? (
                  <RemoveIcon className="text-color-header-dark-gray" />
                ) : (
                  <AddIcon className="text-color-header-dark-gray" />
                )}
              </IconButton>
            ) : (
              <IconButton className="p-4">
                <BsCaretRight className="text-color-header-dark-gray" />
              </IconButton>
            )}
          </div>

          {/* Module Name */}
          <strong className="text-lg ">{node.name}</strong>
        </div>

        {/* Module Rights */}
        <div className="flex items-center space-x-4 mr-16 font-roboto text-md">
          {node.rights?.map((right) => (
            <FormControlLabel
              key={right}
              control={
                <Switch
                  checked={node.selectedRights[right] || false}
                  onChange={(e) => handleRightChange(right, e.target.checked)}
                  color="primary"
                  className=" text-md"
                />
              }
              label={right}
              className="mb-2 pl-10 font-roboto text-md"
            />
          ))}
        </div>
      </div>

      {/* Children (Menus) - Only visible when open */}
      {node.children && node.children.length > 0 && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <div className="ml-6 pl-[10px] max-h-[100rem]  scrollbar-thin ">
            {node.children.map((child) => (
              <TreeNode
                key={child.id}
                node={child}
                onRightsChange={onRightsChange}
              />
            ))}
          </div>
        </Collapse>
      )}
    </div>
  );
};

export default TreeNode;
