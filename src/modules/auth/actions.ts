import { moduleName } from "./module";

export const actionTypes = {
  RUN_SIGN_IN_REQUEST: `${moduleName}/RUN_SIGN_IN_REQUEST`,
  RUN_SIGN_UP_REQUEST: `${moduleName}/RUN_SIGN_UP_REQUEST`,
  RUN_SIGN_OUT_REQUEST: `${moduleName}/RUN_SIGN_OUT_REQUEST`,

  SET_SIGN_IN_REQUEST_STARTED: `${moduleName}/SET_SIGN_IN_REQUEST_STARTED`,
  SET_SIGN_IN_REQUEST_COMPLETED: `${moduleName}/SET_SIGN_IN_REQUEST_COMPLETED`,
  SET_SIGN_IN_REQUEST_ERROR: `${moduleName}/SET_SIGN_IN_REQUEST_ERROR`,

  SET_SIGN_UP_REQUEST_STARTED: `${moduleName}/SET_SIGN_UP_REQUEST_STARTED`,
  SET_SIGN_UP_REQUEST_COMPLETED: `${moduleName}/SET_SIGN_UP_REQUEST_COMPLETED`,
  SET_SIGN_UP_REQUEST_ERROR: `${moduleName}/SET_SIGN_UP_REQUEST_ERROR`,

  SET_SIGN_OUT_REQUEST_STARTED: `${moduleName}/SET_SIGN_OUT_REQUEST_STARTED`,
  SET_SIGN_OUT_REQUEST_COMPLETED: `${moduleName}/SET_SIGN_OUT_REQUEST_COMPLETED`,
  SET_SIGN_OUT_REQUEST_ERROR: `${moduleName}/SET_SIGN_OUT_REQUEST_ERROR`,
};

export const runSignInRequest = (email: string, password: string) => ({
  type: actionTypes.RUN_SIGN_IN_REQUEST,
  payload: { email, password },
});

export const runSignUpRequest = (
  email: string,
  password: string,
  username: string
) => ({
  type: actionTypes.RUN_SIGN_UP_REQUEST,
  payload: { email, password, username },
});

export const runSignOutRequest = () => ({
  type: actionTypes.RUN_SIGN_OUT_REQUEST,
});

export const setSignInRequestStarted = (started: boolean) => ({
  type: actionTypes.SET_SIGN_IN_REQUEST_STARTED,
  payload: { started },
});

export const setSignInRequestCompleted = (completed: boolean) => ({
  type: actionTypes.SET_SIGN_IN_REQUEST_COMPLETED,
  payload: { completed },
});

export const setSignInRequestError = (error: string) => ({
  type: actionTypes.SET_SIGN_IN_REQUEST_ERROR,
  payload: { error },
});

export const setSignUpRequestStarted = (started: boolean) => ({
  type: actionTypes.SET_SIGN_UP_REQUEST_STARTED,
  payload: { started },
});

export const setSignUpRequestCompleted = (completed: boolean) => ({
  type: actionTypes.SET_SIGN_UP_REQUEST_COMPLETED,
  payload: { completed },
});

export const setSignUpRequestError = (error: string) => ({
  type: actionTypes.SET_SIGN_UP_REQUEST_ERROR,
  payload: { error },
});

export const setSignOutRequestStarted = (started: boolean) => ({
  type: actionTypes.SET_SIGN_OUT_REQUEST_STARTED,
  payload: { started },
});

export const setSignOutRequestCompleted = (completed: boolean) => ({
  type: actionTypes.SET_SIGN_OUT_REQUEST_COMPLETED,
  payload: { completed },
});

export const setSignOutRequestError = (error: string) => ({
  type: actionTypes.SET_SIGN_OUT_REQUEST_ERROR,
  payload: { error },
});
