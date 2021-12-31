import { UserModuleT } from "./types/user.types";

export const UserModuleState: UserModuleT = {
  userInfoRequestStarted: false,
  userInfoRequestCompleted: false,
  userInfoRequestError: "",

  userId: false,
  userToken: false,
  userInfo: false,
};
