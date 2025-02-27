//AddProfile
import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import ModuleData from "./EditTree";


const EditTree = ({ selectedmenu ,isEditable}) => {
  console.log("ViewTree",selectedmenu)
 
  const [filteredModuleData, setFilteredModuleData] = useState([]);

  const filteredModules = useSelector((state) => state.user.filteredModules);

  useEffect(() => {
    if (filteredModules.length) {
      setFilteredModuleData(filteredModules);
    }
  }, [filteredModules]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col justify-between font-roboto">
      <form onSubmit={handleSubmit}>
        <div className="mt-6">
          <ModuleData
            moduleData={filteredModuleData}
            menuActionsProfile={selectedmenu}
            isEditable={isEditable}
          />
        </div>
      </form>
    </div>
  );
};

export default EditTree;
