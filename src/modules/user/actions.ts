import { UserModel } from "../../helpers/api/model";
import { moduleName } from "./module";

export const actionTypes = {
  RUN_USER_INFO_REQUEST: `${moduleName}/RUN_USER_INFO_REQUEST`,

  SET_USER_INFO_REQUEST_STARTED: `${moduleName}/SET_USER_INFO_REQUEST_STARTED`,
  SET_USER_INFO_REQUEST_COMPLETED: `${moduleName}/SET_USER_INFO_REQUEST_COMPLETED`,
  SET_USER_INFO_REQUEST_ERROR: `${moduleName}/SET_USER_INFO_REQUEST_ERROR`,

  SET_USER_ID: `${moduleName}/SET_USER_ID`,
  SET_USER_TOKEN: `${moduleName}/SET_USER_TOKEN`,
  SET_USER_INFO: `${moduleName}/SET_USER_INFO`,
};

export const runUserInfoRequest = () => {
  return {
    type: actionTypes.RUN_USER_INFO_REQUEST,
  };
};

export const setUserInfoRequestStarted = (started: boolean) => ({
  type: actionTypes.SET_USER_INFO_REQUEST_STARTED,
  payload: { started },
});

export const setUserInfoRequestCompleted = (completed: boolean) => ({
  type: actionTypes.SET_USER_INFO_REQUEST_COMPLETED,
  payload: { completed },
});

export const setUserInfoRequestError = (error: string) => ({
  type: actionTypes.SET_USER_INFO_REQUEST_ERROR,
  payload: { error },
});

export const setUserId = (id: string | false) => ({
  type: actionTypes.SET_USER_ID,
  payload: { id },
});

export const setUserToken = (token: string | false) => ({
  type: actionTypes.SET_USER_TOKEN,
  payload: { token },
});

export const setUserInfo = (info: UserModel | false) => ({
  type: actionTypes.SET_USER_INFO,
  payload: { info },
});
