import { createSlice } from "@reduxjs/toolkit";

const Epurse = createSlice({
  name: "Epurse",
  initialState: {
    customersData: [],
    customersSelectedItem: [],
    leadsData: [],
    leadsSelectedItem: [],
  },
  reducers: {
    setCustomersData: (state, action) => {
      state.customersData = action.payload; // Add payload menuInf0 to items array
    },
    setCustomersSelectedItem: (state, action) => {
      state.customersSelectedItem = action.payload; // Add payload menuInf0 to items array
    },

    setLeadsData: (state, action) => {
      state.leadsData = action.payload; // Add payload menuInf0 to items array
    },
    setLeadsSelectedItem: (state, action) => {
      state.leadsSelectedItem = action.payload; // Add payload menuInf0 to items array
    },

    // Action to clear the user data when logging out
    clearUserDataCustomerEpurse: (state) => {
      state.customersData = [];
      state.customersSelectedItem = [];
      state.leadsData = [];
      state.leadsSelectedItem = [];
    },
  },
});

// Export the actions for use in components
export const {
  setCustomersData,
  setCustomersSelectedItem,
  setLeadsData,
  setLeadsSelectedItem,
  clearUserDataCustomerEpurse,
} = Epurse.actions;

// Export the reducer to be used in the store
export default Epurse.reducer;
