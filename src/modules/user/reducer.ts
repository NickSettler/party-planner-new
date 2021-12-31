import { UserModuleT } from "./types/user.types";
import { UserModuleState } from "./schema";
import { AnyAction } from "@reduxjs/toolkit";
import { actionTypes } from "./actions";

const reducer = (
  state: UserModuleT = UserModuleState,
  { type, payload }: AnyAction
) => {
  switch (type) {
    case actionTypes.RUN_USER_INFO_REQUEST:
      return {
        ...state,
        userInfoRequestCompleted: false,
        userInfoRequestError: "",
      };
    case actionTypes.SET_USER_INFO_REQUEST_STARTED:
      return {
        ...state,
        userInfoRequestStarted: payload.started,
      };
    case actionTypes.SET_USER_INFO_REQUEST_COMPLETED:
      return {
        ...state,
        userInfoRequestCompleted: payload.completed,
      };
    case actionTypes.SET_USER_INFO_REQUEST_ERROR:
      return {
        ...state,
        userInfoRequestError: payload.error,
      };
    case actionTypes.SET_USER_ID:
      return {
        ...state,
        userId: payload.id,
      };
    case actionTypes.SET_USER_TOKEN: {
      return {
        ...state,
        userToken: payload.token,
      };
    }
    case actionTypes.SET_USER_INFO: {
      return {
        ...state,
        userInfo: payload.info,
      };
    }
    default:
      return state;
  }
};

export default reducer;
