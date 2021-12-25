export type AuthModuleT = {
  signInRequestStarted: boolean;
  signInRequestCompleted: boolean;
  signInRequestError: string;

  signUpRequestStarted: boolean;
  signUpRequestCompleted: boolean;
  signUpRequestError: string;

  signOutRequestStarted: boolean;
  signOutRequestCompleted: boolean;
  signOutRequestError: string;
};
