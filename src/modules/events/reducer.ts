import { EventsModuleState } from "./schema";
import { AnyAction } from "@reduxjs/toolkit";
import { actionTypes } from "./actions";
import { EventsModuleT } from "./types/events.types";
import { EventModel } from "../../helpers/api/model";
import { cloneDeep } from "lodash";

const reducer = (
  state: EventsModuleT = EventsModuleState,
  { type, payload }: AnyAction
) => {
  switch (type) {
    case actionTypes.RUN_EVENTS_REQUEST:
      return {
        ...state,
      };
    case actionTypes.RUN_EVENT_REQUEST:
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
    case actionTypes.SET_EVENT_REQUEST_STARTED:
      return {
        ...state,
        eventRequestStarted: payload.started,
      };
    case actionTypes.SET_EVENT_REQUEST_COMPLETED:
      return {
        ...state,
        eventRequestCompleted: payload.completed,
      };
    case actionTypes.SET_EVENT_REQUEST_ERROR:
      return {
        ...state,
        eventRequestError: payload.error,
      };
    case actionTypes.SET_EVENTS: {
      return {
        ...state,
        events: cloneDeep(payload.events),
      };
    }
    case actionTypes.MERGE_EVENT: {
      const events = state.events;

      const eventIndex = events.findIndex(
        (event: EventModel) => event.id === payload.event.id
      );

      if (eventIndex === -1) events.push(payload.event);
      else events[eventIndex] = payload.event;

      return {
        ...state,
        events: cloneDeep(events),
      };
    }

    default:
      return state;
  }
};

export default reducer;
