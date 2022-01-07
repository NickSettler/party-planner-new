import { EventsModuleState } from "./schema";
import { AnyAction } from "@reduxjs/toolkit";
import { actionTypes } from "./actions";
import { EventsModuleT } from "./types/events.types";

const reducer = (
  state: EventsModuleT = EventsModuleState,
  { type, payload }: AnyAction
) => {
  switch (type) {
    case actionTypes.RUN_EVENTS_REQUEST:
      return {
        ...state,
      };
    case actionTypes.SET_EVENTS_REQUEST_STARTED:
      return {
        ...state,
        eventsRequestStarted: payload.started,
      };
    case actionTypes.SET_EVENTS_REQUEST_COMPLETED:
      return {
        ...state,
        eventsRequestCompleted: payload.completed,
      };
    case actionTypes.SET_EVENTS_REQUEST_ERROR:
      return {
        ...state,
        eventsRequestError: payload.error,
      };
    case actionTypes.SET_EVENTS:
      return {
        ...state,
        events: payload.events,
      };
    default:
      return state;
  }
};

export default reducer;
