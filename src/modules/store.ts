import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer, { moduleName as authModuleName } from "./auth";
import userReducer, { moduleName as userModuleName } from "./user";
import eventsReducer, { moduleName as eventsModuleName } from "./events";
import membersReducer, { moduleName as membersModuleName } from "./members";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

let middleware: Array<any> = [];

if (process.env.NODE_ENV !== "production") {
  if (window.__REDUX_DEVTOOLS_EXTENSION__)
    middleware.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

const enhancer = compose(applyMiddleware(sagaMiddleware), ...middleware);

const rootReducer = combineReducers({
  [authModuleName]: authReducer,
  [userModuleName]: userReducer,
  [eventsModuleName]: eventsReducer,
  [membersModuleName]: membersReducer,
});

const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

if (process.env.NODE_ENV !== "production") window.store = store;

export default store;
