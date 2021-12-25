import { UserModuleT } from "./types/user.types";
import { UserModuleState } from "./schema";
import { AnyAction } from "@reduxjs/toolkit";
import { actionTypes } from "./actions";

const reducer = (
  state: UserModuleT = UserModuleState,
  { type, payload }: AnyAction
) => {
  switch (type) {
    case actionTypes.SET_USER_ID:
      return {
        ...state,
        userId: payload.id,
      };
    case actionTypes.SET_USER_TOKEN: {
      return {
        ...state,
        userToken: payload.token,
      };
    }
    default:
      return state;
  }
};

export default reducer;
