import { AuthModuleT } from "./types/auth.types";
import { AuthModuleState } from "./schema";
import { AnyAction } from "@reduxjs/toolkit";
import { actionTypes } from "./actions";

const reducer = (
  state: AuthModuleT = AuthModuleState,
  { type, payload }: AnyAction
) => {
  switch (type) {
    case actionTypes.RUN_SIGN_IN_REQUEST:
      return {
        ...state,
        signInRequestCompleted: false,
        signInRequestError: "",
      };
    case actionTypes.SET_SIGN_IN_REQUEST_STARTED: {
      const { started } = payload;
      return {
        ...state,
        signInRequestStarted: started,
      };
    }
    case actionTypes.SET_SIGN_IN_REQUEST_COMPLETED: {
      const { completed } = payload;
      return {
        ...state,
        signInRequestCompleted: completed,
      };
    }
    case actionTypes.SET_SIGN_IN_REQUEST_ERROR: {
      const { error } = payload;
      return {
        ...state,
        signInRequestError: error,
      };
    }
    default:
      return state;
  }
};

export default reducer;
