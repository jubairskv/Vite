import { createSlice } from "@reduxjs/toolkit";

const UserManagementSlice = createSlice({
  name: "UserManagement",
  initialState: {
    userSelectedItem: [],
    profileSelecteddItem: [],
    userSelItem: [],
    SidebarMenuItem: [],
  },
  reducers: {
    setUserSelectedItem: (state, action) => {
      state.userSelectedItem = action.payload;
    },
    setUserSelItem: (state, action) => {
      state.userSelItem = action.payload;
    },
    setProfileSelectedItem: (state, action) => {
      state.profileSelecteddItem = action.payload;
    },
    setSidebarMenuItem: (state, action) => {
      state.SidebarMenuItem = action.payload;
    },
    clearUserDataUserManagement: (state) => {
      state.userSelectedItem = [];
      state.userSelItem = [];
      state.profileSelecteddItem = [];
      state.SidebarMenuItem = [];
    },
  },
});

// Export the actions for use in components
export const {
  setUserSelectedItem,
  setProfileSelectedItem,
  setUserSelItem,
  setSidebarMenuItem,
  clearUserDataUserManagement,
} = UserManagementSlice.actions;

// Export the reducer to be used in the store
export default UserManagementSlice.reducer;
