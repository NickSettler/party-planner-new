import { UserModel } from "../../../helpers/api/model";

export type UserModuleT = {
  userInfoRequestStarted: boolean;
  userInfoRequestCompleted: boolean;
  userInfoRequestError: string;

  userId: string | false;
  userToken: string | false;
  userInfo: Partial<UserModel> | false;
};
