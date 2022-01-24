import { EventsModuleState } from "./schema";
import { AnyAction } from "@reduxjs/toolkit";
import { actionTypes } from "./actions";
import { MembersModuleT } from "./types/members.types";

const reducer = (
  state: MembersModuleT = EventsModuleState,
  { type, payload }: AnyAction
) => {
  switch (type) {
    case actionTypes.RUN_MEMBERS_REQUEST:
      return {
        ...state,
      };
    case actionTypes.RUN_MEMBER_UPDATE_REQUEST: {
      return {
        ...state,
      };
    }

    case actionTypes.SET_MEMBERS_REQUEST_STARTED:
      return {
        ...state,
        eventsRequestStarted: payload.started,
      };
    case actionTypes.SET_MEMBERS_REQUEST_COMPLETED:
      return {
        ...state,
        eventsRequestCompleted: payload.completed,
      };
    case actionTypes.SET_MEMBERS_REQUEST_ERROR:
      return {
        ...state,
        eventsRequestError: payload.error,
      };

    case actionTypes.SET_MEMBER_CAME_STATUS:
      return {
        ...state,
      };
    case actionTypes.MEMBER_STATUS_CHANGE_STARTED:
      return {
        ...state,
        memberStatusChangeStarted: payload.started,
      };
    case actionTypes.MEMBER_STATUS_CHANGE_COMPLETED:
      return {
        ...state,
        memberStatusChangeCompleted: payload.completed,
      };
    case actionTypes.MEMBER_STATUS_CHANGE_ERROR:
      return {
        ...state,
        memberStatusChangeError: payload.error,
      };

    case actionTypes.SET_MEMBER_UPDATE_REQUEST_STARTED:
      return {
        ...state,
        memberUpdateRequestStarted: payload.started,
      };

    case actionTypes.SET_MEMBER_UPDATE_REQUEST_COMPLETED:
      return {
        ...state,
        memberUpdateRequestCompleted: payload.completed,
      };

    case actionTypes.SET_MEMBER_UPDATE_REQUEST_ERROR:
      return {
        ...state,
        memberUpdateRequestError: payload.error,
      };

    case actionTypes.SET_MEMBER_MODAL_ID:
      return {
        ...state,
        memberModalId: `${payload.id}`,
      };

    default:
      return state;
  }
};

export default reducer;
