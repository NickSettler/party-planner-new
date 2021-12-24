import { combineReducers, compose, createStore } from "@reduxjs/toolkit";
import authReducer, { moduleName as authModuleName } from "./auth";

let middleware: Array<Function> = [];

if (process.env.NODE_ENV !== "production") {
  middleware.push(
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

const rootReducer = combineReducers({
  [authModuleName]: authReducer,
});
const store = createStore(rootReducer, compose(...middleware));

export default store;
