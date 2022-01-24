import { moduleName } from "./module";
import { PartiesToDirectusUsersModel } from "../../helpers/api/model";

export const actionTypes = {
  RUN_MEMBERS_REQUEST: `${moduleName}/RUN_MEMBERS_REQUEST`,
  RUN_MEMBER_UPDATE_REQUEST: `${moduleName}/RUN_MEMBER_UPDATE_REQUEST`,

  SET_MEMBERS_REQUEST_STARTED: `${moduleName}/SET_EVENTS_REQUEST_STARTED`,
  SET_MEMBERS_REQUEST_COMPLETED: `${moduleName}/SET_EVENTS_REQUEST_COMPLETED`,
  SET_MEMBERS_REQUEST_ERROR: `${moduleName}/SET_EVENTS_REQUEST_ERROR`,

  SET_MEMBER_UPDATE_REQUEST_STARTED: `${moduleName}/SET_MEMBER_UPDATE_REQUEST_STARTED`,
  SET_MEMBER_UPDATE_REQUEST_COMPLETED: `${moduleName}/SET_MEMBER_UPDATE_REQUEST_COMPLETED`,
  SET_MEMBER_UPDATE_REQUEST_ERROR: `${moduleName}/SET_MEMBER_UPDATE_REQUEST_ERROR`,

  SET_MEMBER_CAME_STATUS: `${moduleName}/SET_MEMBER_CAME_STATUS`,

  MEMBER_STATUS_CHANGE_STARTED: `${moduleName}/MEMBER_STATUS_CHANGE_STARTED`,
  MEMBER_STATUS_CHANGE_COMPLETED: `${moduleName}/MEMBER_STATUS_CHANGE_COMPLETED`,
  MEMBER_STATUS_CHANGE_ERROR: `${moduleName}/MEMBER_STATUS_CHANGE_ERROR`,

  SET_MEMBER_MODAL_ID: `${moduleName}/SET_MEMBER_MODAL_ID`,
};

export const runMembersRequest = (eventId: string | number) => {
  return {
    type: actionTypes.RUN_MEMBERS_REQUEST,
    payload: {
      eventId,
    },
  };
};

export const runMemberUpdateRequest = (
  memberInfo: PartiesToDirectusUsersModel
) => {
  return {
    type: actionTypes.RUN_MEMBER_UPDATE_REQUEST,
    payload: {
      memberInfo,
    },
  };
};

export const setMembersRequestStarted = (started: boolean) => ({
  type: actionTypes.SET_MEMBERS_REQUEST_STARTED,
  payload: { started },
});

export const setMembersRequestCompleted = (completed: boolean) => ({
  type: actionTypes.SET_MEMBERS_REQUEST_COMPLETED,
  payload: { completed },
});

export const setMembersRequestError = (error: string) => ({
  type: actionTypes.SET_MEMBERS_REQUEST_ERROR,
  payload: { error },
});

export const setMemberUpdateRequestStarted = (started: boolean) => ({
  type: actionTypes.SET_MEMBER_UPDATE_REQUEST_STARTED,
  payload: { started },
});

export const setMemberUpdateRequestCompleted = (completed: boolean) => ({
  type: actionTypes.SET_MEMBER_UPDATE_REQUEST_COMPLETED,
  payload: { completed },
});

export const setMemberUpdateRequestError = (error: string) => ({
  type: actionTypes.SET_MEMBER_UPDATE_REQUEST_ERROR,
  payload: { error },
});

export const setMemberCameStatus = (
  eventId: string | number,
  memberId: string | number,
  came: boolean
) => ({
  type: actionTypes.SET_MEMBER_CAME_STATUS,
  payload: { eventId, memberId, came },
});

export const setMemberStatusChangeStarted = (started: boolean) => ({
  type: actionTypes.MEMBER_STATUS_CHANGE_STARTED,
  payload: { started },
});

export const setMemberStatusChangeCompleted = (completed: boolean) => ({
  type: actionTypes.MEMBER_STATUS_CHANGE_COMPLETED,
  payload: { completed },
});

export const setMemberStatusChangeError = (error: string) => ({
  type: actionTypes.MEMBER_STATUS_CHANGE_ERROR,
  payload: { error },
});

export const setMemberModalId = (id: string | number) => ({
  type: actionTypes.SET_MEMBER_MODAL_ID,
  payload: { id },
});
