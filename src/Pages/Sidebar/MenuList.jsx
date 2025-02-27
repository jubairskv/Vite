import React, { useState } from "react";
import MenuItem from "./MenuItem";

const MenuList = ({ menuItems, navigate, isCollapsed }) => {
  console.log('menuItems', menuItems)
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const handleSubMenuToggle = (menu_id) => {
    setActiveSubMenu(activeSubMenu === menu_id ? null : menu_id);
  };

  return (
    <div className="flex-grow text-black  mt-7  ">
      {menuItems
        ?.filter((item) => item.parent_menu_id === 0)
        ?.map((item) =>{
          console.log('itemitemitem', item);
          
       return    (
        <MenuItem
          key={item?.menu_id}
          item={item}
          menuItems={menuItems}
          activeSubMenu={activeSubMenu}
          handleSubMenuToggle={handleSubMenuToggle}
          navigate={navigate}
          isCollapsed={isCollapsed}
        />
      )
        }
          
      )}
    </div>
  );
};

export default MenuList;
