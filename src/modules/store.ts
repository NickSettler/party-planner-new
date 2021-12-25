import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer, { moduleName as authModuleName } from "./auth";
import userReducer, { moduleName as userModuleName } from "./user";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

let middleware: Array<any> = [];

if (process.env.NODE_ENV !== "production") {
  middleware.push(
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

const enhancer = compose(applyMiddleware(sagaMiddleware), ...middleware);

const rootReducer = combineReducers({
  [authModuleName]: authReducer,
  [userModuleName]: userReducer,
});

const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
