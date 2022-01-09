import { moduleName } from "./module";
import { createSelector } from "@reduxjs/toolkit";
import { EventsModuleT } from "./types/events.types";

const eventsModule = (state: any) => state[moduleName];

export const eventsRequestStartedSelector = createSelector(
  eventsModule,
  (state: EventsModuleT) => state.eventsRequestStarted
);

export const eventsRequestCompletedSelector = createSelector(
  eventsModule,
  (state: EventsModuleT) => state.eventsRequestCompleted
);

export const eventsRequestErrorSelector = createSelector(
  eventsModule,
  (state: EventsModuleT) => state.eventsRequestError
);

export const eventsRequestLoadingSelector = createSelector(
  eventsModule,
  (state: EventsModuleT) =>
    state.eventsRequestStarted &&
    !(state.eventsRequestCompleted || state.eventsRequestError)
);

export const eventsRequestSuccessSelector = createSelector(
  eventsModule,
  (state: EventsModuleT) =>
    !state.eventsRequestStarted && state.eventsRequestCompleted
);

export const eventsRequestFailedSelector = createSelector(
  eventsModule,
  (state: EventsModuleT) =>
    !state.eventsRequestStarted && state.eventsRequestError
);

export const eventRequestStartedSelector = createSelector(
  eventsModule,
  (state: EventsModuleT) => state.eventRequestStarted
);

export const eventRequestCompletedSelector = createSelector(
  eventsModule,
  (state: EventsModuleT) => state.eventRequestCompleted
);

export const eventRequestErrorSelector = createSelector(
  eventsModule,
  (state: EventsModuleT) => state.eventRequestError
);

export const eventRequestLoadingSelector = createSelector(
  eventsModule,
  (state: EventsModuleT) =>
    state.eventRequestStarted &&
    !(state.eventRequestCompleted || state.eventRequestError)
);

export const eventRequestSuccessSelector = createSelector(
  eventsModule,
  (state: EventsModuleT) =>
    !state.eventRequestStarted && state.eventRequestCompleted
);

export const eventRequestFailedSelector = createSelector(
  eventsModule,
  (state: EventsModuleT) =>
    !state.eventRequestStarted && state.eventRequestError
);

export const eventsSelector = createSelector(
  [eventsModule],
  (state: EventsModuleT) => state.events
);
