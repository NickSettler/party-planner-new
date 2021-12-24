import { combineReducers, createStore } from "@reduxjs/toolkit";
import authReducer, { moduleName as authModuleName } from "./auth";

const rootReducer = combineReducers({
  [authModuleName]: authReducer,
});
const store = createStore(rootReducer);

export default store;
