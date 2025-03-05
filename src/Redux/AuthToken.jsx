import { createSlice } from "@reduxjs/toolkit";

const AuthToken = createSlice({
  name: "token",
  initialState: {
    token: null,
    deviceId: [],
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload; // Add payload menuInf0 to items array
    },
    setDeviceId: (state, action) => {
      state.deviceId = action.payload; // Add payload menuInf0 to items array
    },
    clearToken: (state) => {
      state.token = [];
    },
    clearUserDataAuth: (state) => {
      state.token = null;
      state.deviceId = [];
    },
  },
});

// Export the actions for use in components
export const { setToken, setDeviceId, clearUserDataAuth,clearToken } = AuthToken.actions;

// Export the reducer to be used in the store
export default AuthToken.reducer;
