import React, { MutableRefObject } from "react";

export type AccountDropdownMenuItem = {
  label: string;
  link: string;
  icon?: React.ReactNode;
};

export type AccountDropdownPropsT = {
  signOut: () => void;
};

export type AccountDropdownHookT = {
  popoverRef: MutableRefObject<HTMLButtonElement | null>;
  open: boolean;
  toggleOpen: (open?: boolean) => void;
  navigateTo: (url: string) => void;
};
