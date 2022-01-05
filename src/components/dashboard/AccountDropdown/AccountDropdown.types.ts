import React, { MutableRefObject } from "react";
import { UserModel } from "../../../helpers/api/model";

export type AccountDropdownMenuItem = {
  label: string;
  link: string;
  icon?: React.ReactNode;
};

export type AccountDropdownPropsT = {
  userInfo: Partial<UserModel> | false;
  signOut: () => void;
};

export type AccountDropdownHookT = {
  popoverRef: MutableRefObject<HTMLButtonElement | null>;
  open: boolean;
  toggleOpen: (open?: boolean) => void;
  navigateTo: (url: string) => void;
};
