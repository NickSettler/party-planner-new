import { moduleName } from "./module";
import { createSelector } from "@reduxjs/toolkit";
import { UserModuleT } from "./types/user.types";

const userModule = (state: any) => state[moduleName];

export const userInfoRequestStartedSelector = createSelector(
  userModule,
  (state: UserModuleT) => state.userInfoRequestStarted
);

export const userInfoRequestCompletedSelector = createSelector(
  userModule,
  (state: UserModuleT) => state.userInfoRequestCompleted
);

export const userInfoRequestErrorSelector = createSelector(
  userModule,
  (state: UserModuleT) => state.userInfoRequestError
);

export const userInfoRequestLoadingSelector = createSelector(
  userModule,
  (state: UserModuleT) =>
    state.userInfoRequestStarted &&
    !(state.userInfoRequestCompleted || state.userInfoRequestError)
);

export const userInfoRequestSuccessSelector = createSelector(
  userModule,
  (state: UserModuleT) =>
    !state.userInfoRequestStarted && state.userInfoRequestCompleted
);

export const userInfoRequestFailedSelector = createSelector(
  userModule,
  (state: UserModuleT) =>
    !state.userInfoRequestStarted && state.userInfoRequestError
);

export const userIdSelector = createSelector(
  [userModule],
  (state: UserModuleT) => state.userId
);

export const userTokenSelector = createSelector(
  [userModule],
  (state: UserModuleT) => state.userToken
);

export const userLoggedSelector = createSelector(
  [userModule],
  (state: UserModuleT) => !!state.userToken
);

export const userInfoSelector = createSelector(
  [userModule],
  (state: UserModuleT) => state.userInfo
);
