import { UserModel } from "../../../helpers/api/model";

export type SidebarPropsT = {
  open: boolean;
  onClose: () => void;
};

export type DrawerContentPropsT = {
  userInfo: Partial<UserModel> | false;
};
