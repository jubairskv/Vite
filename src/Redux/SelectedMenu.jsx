import { createSlice } from "@reduxjs/toolkit";

const SelectedMenu = createSlice({
  name: "menu",
  initialState: {
    selectedMenuItem: [],
    selectedModuleIcon:null,
  },
  reducers: {
    setSelectedMenuItem: (state, action) => {
      state.selectedMenuItem = action.payload; 
    },
    setSelectedModuleIcon: (state, action) => {
      state.selectedModuleIcon = action.payload; 
    },
    clearUserDataSelectedMenu: (state) => {
      state.selectedMenuItem = [];
      state.selectedModuleIcon = null; 
    },
  },
});

// Export the actions for use in components
export const { setSelectedMenuItem , clearUserDataSelectedMenu, setSelectedModuleIcon} = SelectedMenu.actions;

// Export the reducer to be used in the store
export default SelectedMenu.reducer;
