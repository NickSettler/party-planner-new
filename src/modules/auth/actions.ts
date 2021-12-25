export const actionTypes = {
  RUN_SIGN_IN_REQUEST: "RUN_SIGN_IN_REQUEST",
  RUN_SIGN_OUT_REQUEST: "RUN_SIGN_OUT_REQUEST",

  SET_SIGN_IN_REQUEST_STARTED: "SET_SIGN_IN_REQUEST_STARTED",
  SET_SIGN_IN_REQUEST_COMPLETED: "SET_SIGN_IN_REQUEST_COMPLETED",
  SET_SIGN_IN_REQUEST_ERROR: "SET_SIGN_IN_REQUEST_ERROR",

  SET_SIGN_OUT_REQUEST_STARTED: "SET_SIGN_OUT_REQUEST_STARTED",
  SET_SIGN_OUT_REQUEST_COMPLETED: "SET_SIGN_OUT_REQUEST_COMPLETED",
  SET_SIGN_OUT_REQUEST_ERROR: "SET_SIGN_OUT_REQUEST_ERROR",
};

export const runSignInRequest = (email: string, password: string) => ({
  type: actionTypes.RUN_SIGN_IN_REQUEST,
  payload: { email, password },
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
