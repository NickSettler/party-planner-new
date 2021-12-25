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

export const signOutRequestStartedSelector = createSelector(
  [authModule],
  (state: AuthModuleT) => state.signOutRequestStarted
);

export const signOutRequestCompletedSelector = createSelector(
  [authModule],
  (state: AuthModuleT) => state.signOutRequestCompleted
);

export const signOutRequestErrorSelector = createSelector(
  [authModule],
  (state: AuthModuleT) => state.signOutRequestError
);

export const signOutRequestLoading = createSelector(
  [authModule],
  (state: AuthModuleT) =>
    state.signOutRequestStarted &&
    !(state.signOutRequestCompleted || state.signOutRequestError)
);

export const signOutRequestSuccessSelector = createSelector(
  [authModule],
  (state: AuthModuleT) =>
    !state.signOutRequestStarted && state.signOutRequestCompleted
);

export const signOutRequestFailedSelector = createSelector(
  [authModule],
  (state: AuthModuleT) =>
    !state.signOutRequestStarted && !!state.signOutRequestError
);
