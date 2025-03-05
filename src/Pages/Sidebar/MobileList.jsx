import React, { useState } from "react";
import MobileItem from "./MobileMenuItem";

const MobileList = ({ menuItems, navigate, isCollapsed }) => {
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const handleSubMenuToggle = (menu_id) => {
    setActiveSubMenu(activeSubMenu === menu_id ? null : menu_id);
  };

  

  return (
    <div className="flex-grow text-color-white   mt-7  ">
      {menuItems
        ?.filter((item) => item.parent_menu_id === 0)
        ?.map((item) => (
          <MobileItem
            key={item?.menu_id}
            item={item}
            menuItems={menuItems}
            activeSubMenu={activeSubMenu}
            handleSubMenuToggle={handleSubMenuToggle}
            navigate={navigate}
            isCollapsed={isCollapsed}
          />
        ))}
    </div>
  );
};

export default MobileList;
