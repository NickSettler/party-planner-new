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
    case actionTypes.RUN_SIGN_UP_REQUEST:
      return {
        ...state,
        signUpRequestCompleted: false,
        signUpRequestError: "",
      };
    case actionTypes.RUN_SIGN_OUT_REQUEST: {
      return {
        ...state,
        signOutRequestCompleted: false,
        signOutRequestError: "",
      };
    }

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

    case actionTypes.SET_SIGN_UP_REQUEST_STARTED: {
      const { started } = payload;
      return {
        ...state,
        signUpRequestStarted: started,
      };
    }
    case actionTypes.SET_SIGN_UP_REQUEST_COMPLETED: {
      const { completed } = payload;
      return {
        ...state,
        signUpRequestCompleted: completed,
      };
    }
    case actionTypes.SET_SIGN_UP_REQUEST_ERROR: {
      const { error } = payload;
      return {
        ...state,
        signUpRequestError: error,
      };
    }

    case actionTypes.SET_SIGN_OUT_REQUEST_STARTED: {
      const { started } = payload;
      return {
        ...state,
        signOutRequestStarted: started,
      };
    }
    case actionTypes.SET_SIGN_OUT_REQUEST_COMPLETED: {
      const { completed } = payload;
      return {
        ...state,
        signOutRequestCompleted: completed,
      };
    }
    case actionTypes.SET_SIGN_OUT_REQUEST_ERROR: {
      const { error } = payload;
      return {
        ...state,
        signOutRequestError: error,
      };
    }

    default:
      return state;
  }
};

export default reducer;
