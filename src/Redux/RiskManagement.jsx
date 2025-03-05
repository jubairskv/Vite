import { createSlice } from "@reduxjs/toolkit";

const RiskManagement = createSlice({
  name: "riskManagement",
  initialState: {
  settingsMenuItems  : [],
  selectedEntity : null,
  selectedRiskCriteria : {},
  riskCriteriaListCount : []
  },
  reducers: {
     setSelectedEntity : (state , action) => {
         state.selectedEntity = action.payload
     },
     setSelectedRiskCriteria : (state , action) =>{
         state.selectedRiskCriteria = action.payload
     },
    setSettingsMenuItems: (state, action) => {
      state.settingsMenuItems = action.payload; 
    },
    setRiskCriteriaRiskCount : (state , action) => {
     state.riskCriteriaListCount = action.payload
    },

   
    // Action to clear the user data when logging out
    clearSettingsMenuItems: (state) => {
      state.settingsMenuItems = [];
      state.selectedEntity = null
      state.riskCriteriaListCount = []
    },
  },
});

// Export the actions for use in components
export const {
    setSettingsMenuItems,
  clearSettingsMenuItems,
  setSelectedEntity,
  setSelectedRiskCriteria,
  setRiskCriteriaRiskCount
} = RiskManagement.actions;

// Export the reducer to be used in the store
export default RiskManagement.reducer;
