export type HeaderPropsT = {
  userLogged: boolean;
  runSignOut: () => void;
};

export type HeaderHookT = {
  handleSignOutClick: () => void;
};
