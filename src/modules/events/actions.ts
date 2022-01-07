import { EventModel } from "../../helpers/api/model";
import { moduleName } from "./module";

export const actionTypes = {
  RUN_EVENTS_REQUEST: `${moduleName}/RUN_EVENTS_REQUEST`,

  SET_EVENTS_REQUEST_STARTED: `${moduleName}/SET_EVENTS_REQUEST_STARTED`,
  SET_EVENTS_REQUEST_COMPLETED: `${moduleName}/SET_EVENTS_REQUEST_COMPLETED`,
  SET_EVENTS_REQUEST_ERROR: `${moduleName}/SET_EVENTS_REQUEST_ERROR`,

  SET_EVENTS: `${moduleName}/SET_EVENTS`,
};

export const runEventsRequest = () => {
  return {
    type: actionTypes.RUN_EVENTS_REQUEST,
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

export const setEvents = (events: EventModel[]) => ({
  type: actionTypes.SET_EVENTS,
  payload: { events },
});
