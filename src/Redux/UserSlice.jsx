import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    items: [], // Initial state with an empty array
    filteredModules: [],
    setSubMenu: [],
    setAllSubMenu: [],
    treeDatas: [],
    addActions: [],
    listProfile: [],
    triggerSubMenu: [],
    accTypeData: [],
    dropdownActions: [],
    isCollapse: false,
    //accTypeSelectedItem:[],
  },
  reducers: {
    // Action to add user data
    userData: (state, action) => {
      state.items.push(action.payload); // Add payload to items array
    },
    subMenuItemss: (state, action) => {
      state.setSubMenu = action.payload;
    },
    setTreeDatas: (state, action) => {
      state.treeDatas = action.payload; // Add payload to items array
    },
    setDropdownActions: (state, action) => {
      //only submenuActions
      state.dropdownActions = action.payload; // Add payload to items array
    },

    setAddActions: (state, action) => {
      state.addActions = action.payload; // Add payload menuInf0 to items array
    },
    setListProfile: (state, action) => {
      state.listProfile = action.payload; // Add payload menuInf0 to items array
    },
    setTriggerSubMenu: (state, action) => {
      state.triggerSubMenu = action.payload; // Add payload menuInf0 to items array
    },
    setAccTypeData: (state, action) => {
      state.accTypeData = action.payload; // Add payload menuInf0 to items array
    },
    setIsCollapse: (state, action) => {
      state.isCollapse = action.payload; // Add payload menuInf0 to items array
    },

    // Action to clear the user data when logging out
    clearUserData: (state) => {
      state.user = [];
      state.items = []; // Reset items array to an empty state
      state.filteredModules = [];
      state.selectedMenuItems = [];
      state.setSubMenu = [];
      state.setFilteredSubMenu = [];
      state.treeDatas = [];
      state.addActions = [];
      state.listProfile = [];
      state.triggerSubMenu = [];
      state.accTypeData = [];
      state.dropdownActions = [];
      state.isCollapse = false;
      //state.accTypeSelectedItem=[]
    },
    setFilteredModules: (state, action) => {
      state.filteredModules = action.payload;
    },
    setAllSubMenu: (state, action) => {
      state.setAllSubMenu = action.payload;
    },
  },
});

// Export the actions for use in components
export const {
  userData,
  clearUserData,
  setFilteredModules,
  subMenuItemss,
  setAllSubMenu,
  setTreeDatas,
  setAddActions,
  setListProfile,
  setTriggerSubMenu,
  setAccTypeData,
  setDropdownActions,
  setIsCollapse,
  //setAccTypeSelectedItem,
} = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;
