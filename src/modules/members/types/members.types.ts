export type MembersModuleT = {
  membersRequestStarted: boolean;
  membersRequestCompleted: boolean;
  membersRequestError: string;

  memberStatusChangeStarted: boolean;
  memberStatusChangeCompleted: boolean;
  memberStatusChangeError: string;

  memberUpdateRequestStarted: boolean;
  memberUpdateRequestCompleted: boolean;
  memberUpdateRequestError: string;

  memberModalId: string;
};
