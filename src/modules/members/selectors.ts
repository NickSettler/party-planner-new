import { moduleName } from "./module";
import { createSelector } from "@reduxjs/toolkit";
import { MembersModuleT } from "./types/members.types";

const membersModule = (state: any) => state[moduleName];

export const membersRequestStartedSelector = createSelector(
  membersModule,
  (state: MembersModuleT) => state.membersRequestStarted
);

export const membersRequestCompletedSelector = createSelector(
  membersModule,
  (state: MembersModuleT) => state.membersRequestCompleted
);

export const membersRequestErrorSelector = createSelector(
  membersModule,
  (state: MembersModuleT) => state.membersRequestError
);

export const membersRequestLoadingSelector = createSelector(
  membersModule,
  (state: MembersModuleT) =>
    state.membersRequestStarted &&
    !(state.membersRequestCompleted || state.membersRequestError)
);

export const membersRequestSuccessSelector = createSelector(
  membersModule,
  (state: MembersModuleT) =>
    !state.membersRequestStarted && state.membersRequestCompleted
);

export const membersRequestFailedSelector = createSelector(
  membersModule,
  (state: MembersModuleT) =>
    !state.membersRequestStarted && state.membersRequestError
);

export const memberStatusChangeStartedSelector = createSelector(
  membersModule,
  (state: MembersModuleT) => state.memberStatusChangeStarted
);

export const memberStatusChangeCompletedSelector = createSelector(
  membersModule,
  (state: MembersModuleT) => state.memberStatusChangeCompleted
);

export const memberStatusChangeErrorSelector = createSelector(
  membersModule,
  (state: MembersModuleT) => state.memberStatusChangeError
);

export const memberStatusChangeLoadingSelector = createSelector(
  membersModule,
  (state: MembersModuleT) =>
    state.memberStatusChangeStarted &&
    !(state.memberStatusChangeCompleted || state.memberStatusChangeError)
);

export const memberStatusChangeSuccessSelector = createSelector(
  membersModule,
  (state: MembersModuleT) =>
    !state.memberStatusChangeStarted && state.memberStatusChangeCompleted
);

export const memberStatusChangeFailedSelector = createSelector(
  membersModule,
  (state: MembersModuleT) =>
    !state.memberStatusChangeStarted && state.memberStatusChangeError
);
