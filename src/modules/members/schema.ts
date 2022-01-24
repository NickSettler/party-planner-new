import { MembersModuleT } from "./types/members.types";

export const EventsModuleState: MembersModuleT = {
  membersRequestStarted: false,
  membersRequestCompleted: false,
  membersRequestError: "",

  memberStatusChangeStarted: false,
  memberStatusChangeCompleted: false,
  memberStatusChangeError: "",

  memberUpdateRequestStarted: false,
  memberUpdateRequestCompleted: false,
  memberUpdateRequestError: "",

  memberModalId: "",
};
