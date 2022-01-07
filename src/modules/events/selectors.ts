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

export const eventsSelector = createSelector(
  [userModule],
  (state: EventsModuleT) => state.events
);
