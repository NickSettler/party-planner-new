import { moduleName } from "./module";
import { createSelector } from "@reduxjs/toolkit";
import { UserModuleT } from "./types/user.types";

const userModule = (state: any) => state[moduleName];

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
