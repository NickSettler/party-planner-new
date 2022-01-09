import { moduleName } from "./module";

export const actionTypes = {
  RUN_MEMBERS_REQUEST: `${moduleName}/RUN_MEMBERS_REQUEST`,

  SET_MEMBERS_REQUEST_STARTED: `${moduleName}/SET_EVENTS_REQUEST_STARTED`,
  SET_MEMBERS_REQUEST_COMPLETED: `${moduleName}/SET_EVENTS_REQUEST_COMPLETED`,
  SET_MEMBERS_REQUEST_ERROR: `${moduleName}/SET_EVENTS_REQUEST_ERROR`,

  SET_MEMBER_CAME_STATUS: `${moduleName}/SET_MEMBER_CAME_STATUS`,

  MEMBER_STATUS_CHANGE_STARTED: `${moduleName}/MEMBER_STATUS_CHANGE_STARTED`,
  MEMBER_STATUS_CHANGE_COMPLETED: `${moduleName}/MEMBER_STATUS_CHANGE_COMPLETED`,
  MEMBER_STATUS_CHANGE_ERROR: `${moduleName}/MEMBER_STATUS_CHANGE_ERROR`,
};

export const runMembersRequest = (eventId: string | number) => {
  return {
    type: actionTypes.RUN_MEMBERS_REQUEST,
    payload: {
      eventId,
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
