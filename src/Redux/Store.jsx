import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import userReducer from "./UserSlice";
import InstaEnrollReducer from "./InstaEnrollSlice";
import { loadState, saveState } from "./Middleware";
import AuthToken from "./AuthToken";
import SelectedMenuReducer from "./SelectedMenu";
import UserManagementReducer from "./UserManagement";
import Epurse from "./CustomersEpurse";
import riskManagementReducer from './RiskManagement'

// Load the persisted state
const preloadedState = loadState();

const Store = configureStore({
  reducer: {
    user: userReducer,
    instaEnroll: InstaEnrollReducer,
    token: AuthToken,
    menu: SelectedMenuReducer,
    userManagements: UserManagementReducer,
    epurse: Epurse,
    riskManagement : riskManagementReducer,
  },
  preloadedState, // Set the preloaded state
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Use the named import
});

//Save the state to localStorage whenever it changes
Store.subscribe(() => {
  saveState(Store.getState());
});

export default Store;
