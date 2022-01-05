import { UserModel } from "../../../helpers/api/model";

export type DrawerContentPropsT = {
  userInfo: Partial<UserModel> | false;
};
