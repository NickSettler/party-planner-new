import { EventModel } from "../../helpers/api/model";
import { moduleName } from "./module";

export const actionTypes = {
  RUN_EVENTS_REQUEST: `${moduleName}/RUN_EVENTS_REQUEST`,
  RUN_EVENT_REQUEST: `${moduleName}/RUN_EVENT_REQUEST`,

  SET_EVENTS_REQUEST_STARTED: `${moduleName}/SET_EVENTS_REQUEST_STARTED`,
  SET_EVENTS_REQUEST_COMPLETED: `${moduleName}/SET_EVENTS_REQUEST_COMPLETED`,
  SET_EVENTS_REQUEST_ERROR: `${moduleName}/SET_EVENTS_REQUEST_ERROR`,

  SET_EVENT_REQUEST_STARTED: `${moduleName}/SET_EVENT_REQUEST_STARTED`,
  SET_EVENT_REQUEST_COMPLETED: `${moduleName}/SET_EVENT_REQUEST_COMPLETED`,
  SET_EVENT_REQUEST_ERROR: `${moduleName}/SET_EVENT_REQUEST_ERROR`,

  SET_EVENTS: `${moduleName}/SET_EVENTS`,
  MERGE_EVENT: `${moduleName}/MERGE_EVENT`,
};

export const runEventsRequest = () => {
  return {
    type: actionTypes.RUN_EVENTS_REQUEST,
  };
};

export const runEventRequest = (eventId: string) => {
  return {
    type: actionTypes.RUN_EVENT_REQUEST,
    payload: { eventId },
  };
};

export const setEventsRequestStarted = (started: boolean) => ({
  type: actionTypes.SET_EVENTS_REQUEST_STARTED,
  payload: { started },
});

export const setEventsRequestCompleted = (completed: boolean) => ({
  type: actionTypes.SET_EVENTS_REQUEST_COMPLETED,
  payload: { completed },
});

export const setEventsRequestError = (error: string) => ({
  type: actionTypes.SET_EVENTS_REQUEST_ERROR,
  payload: { error },
});

export const setEventRequestStarted = (started: boolean) => ({
  type: actionTypes.SET_EVENT_REQUEST_STARTED,
  payload: { started },
});

export const setEventRequestCompleted = (completed: boolean) => ({
  type: actionTypes.SET_EVENT_REQUEST_COMPLETED,
  payload: { completed },
});

export const setEventRequestError = (error: string) => ({
  type: actionTypes.SET_EVENT_REQUEST_ERROR,
  payload: { error },
});

export const setEvents = (events: EventModel[]) => ({
  type: actionTypes.SET_EVENTS,
  payload: { events },
});

export const mergeEvent = (event: EventModel) => ({
  type: actionTypes.MERGE_EVENT,
  payload: { event },
});
