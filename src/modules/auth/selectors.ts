import { moduleName } from "./module";
import { createSelector } from "@reduxjs/toolkit";
import { AuthModuleT } from "./types/auth.types";

const authModule = (state: any) => state[moduleName];

export const signInRequestStartedSelector = createSelector(
  [authModule],
  (state: AuthModuleT) => state.signInRequestStarted
);

export const signInRequestCompletedSelector = createSelector(
  [authModule],
  (state: AuthModuleT) => state.signInRequestCompleted
);

export const signInRequestErrorSelector = createSelector(
  [authModule],
  (state: AuthModuleT) => state.signInRequestError
);

export const signInRequestLoading = createSelector(
  [authModule],
  (state: AuthModuleT) =>
    state.signInRequestStarted &&
    !(state.signInRequestCompleted || state.signInRequestError)
);

export const signInRequestSuccessSelector = createSelector(
  [authModule],
  (state: AuthModuleT) =>
    !state.signInRequestStarted && state.signInRequestCompleted
);

export const signInRequestFailedSelector = createSelector(
  [authModule],
  (state: AuthModuleT) =>
    !state.signInRequestStarted && !!state.signInRequestError
);
