import { moduleName } from "./module";
import { createSelector } from "@reduxjs/toolkit";
import { EventsModuleT } from "./types/events.types";

const userModule = (state: any) => state[moduleName];

export const eventsRequestStartedSelector = createSelector(
  userModule,
  (state: EventsModuleT) => state.eventsRequestStarted
);

export const eventsRequestCompletedSelector = createSelector(
  userModule,
  (state: EventsModuleT) => state.eventsRequestCompleted
);

export const eventsRequestErrorSelector = createSelector(
  userModule,
  (state: EventsModuleT) => state.eventsRequestError
);

export const eventsRequestLoadingSelector = createSelector(
  userModule,
  (state: EventsModuleT) =>
    state.eventsRequestStarted &&
    !(state.eventsRequestCompleted || state.eventsRequestError)
);

export const eventsRequestSuccessSelector = createSelector(
  userModule,
  (state: EventsModuleT) =>
    !state.eventsRequestStarted && state.eventsRequestCompleted
);

export const eventsRequestFailedSelector = createSelector(
  userModule,
  (state: EventsModuleT) =>
    !state.eventsRequestStarted && state.eventsRequestError
);

export const eventRequestStartedSelector = createSelector(
  userModule,
  (state: EventsModuleT) => state.eventRequestStarted
);

export const eventRequestCompletedSelector = createSelector(
  userModule,
  (state: EventsModuleT) => state.eventRequestCompleted
);

export const eventRequestErrorSelector = createSelector(
  userModule,
  (state: EventsModuleT) => state.eventRequestError
);

export const eventRequestLoadingSelector = createSelector(
  userModule,
  (state: EventsModuleT) =>
    state.eventRequestStarted &&
    !(state.eventRequestCompleted || state.eventRequestError)
);

export const eventRequestSuccessSelector = createSelector(
  userModule,
  (state: EventsModuleT) =>
    !state.eventRequestStarted && state.eventRequestCompleted
);

export const eventRequestFailedSelector = createSelector(
  userModule,
  (state: EventsModuleT) =>
    !state.eventRequestStarted && state.eventRequestError
);

export const eventsSelector = createSelector(
  [userModule],
  (state: EventsModuleT) => state.events
);
