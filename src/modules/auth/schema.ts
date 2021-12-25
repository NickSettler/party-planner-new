import { AuthModuleT } from "./types/auth.types";

export const AuthModuleState: AuthModuleT = {
  signInRequestStarted: false,
  signInRequestCompleted: false,
  signInRequestError: "",

  signUpRequestStarted: false,
  signUpRequestCompleted: false,
  signUpRequestError: "",

  signOutRequestStarted: false,
  signOutRequestCompleted: false,
  signOutRequestError: "",
};
