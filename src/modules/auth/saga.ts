import { put, select, takeEvery } from "redux-saga/effects";
import {
  actionTypes,
  setSignInRequestCompleted,
  setSignInRequestError,
  setSignInRequestStarted,
} from "./actions";
import Api from "../../helpers/api";
import { signInRequestLoading } from "./selectors";
import { AnyAction } from "@reduxjs/toolkit";
import { setUserToken } from "../user";
import { AuthResult } from "@directus/sdk";

export function* authSaga() {
  yield takeEvery(actionTypes.RUN_SIGN_IN_REQUEST, signInRequestWorker);
}

export function* signInRequestWorker({ payload }: AnyAction) {
  const isRequestRunning: boolean = yield select(signInRequestLoading);

  if (isRequestRunning) return;

  const { email, password } = payload;

  yield put(setSignInRequestStarted(true));

  const { response, error }: { response: AuthResult; error: any } =
    yield Api.getInstance()
      .auth.login({
        email,
        password,
      })
      .then((response: AuthResult) => ({ response }))
      .catch((error) => ({ error }));

  yield put(setSignInRequestStarted(false));

  if (error) {
    yield put(setSignInRequestError("Wrong credentials"));
  } else {
    yield put(setSignInRequestCompleted(true));

    const cred = new PasswordCredential({
      id: email,
      password,
    });

    yield navigator.credentials.store(cred);

    yield put(setUserToken(response.access_token));
  }
}
