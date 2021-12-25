import { fork, put, select, takeEvery } from "redux-saga/effects";
import {
  actionTypes,
  setSignInRequestCompleted,
  setSignInRequestError,
  setSignInRequestStarted,
  setSignOutRequestCompleted,
  setSignOutRequestError,
  setSignOutRequestStarted,
} from "./actions";
import Api from "../../helpers/api";
import {
  signInRequestLoading,
  signOutRequestStartedSelector,
} from "./selectors";
import { AnyAction } from "@reduxjs/toolkit";
import { setUserId, setUserToken } from "../user";
import { AuthResult } from "@directus/sdk";
import { LOCAL_STORAGE_KEYS } from "../../helpers/localStorage/consts";

export function* authSaga() {
  yield fork(authInitWorker);

  yield takeEvery(actionTypes.RUN_SIGN_IN_REQUEST, signInRequestWorker);
  yield takeEvery(actionTypes.RUN_SIGN_OUT_REQUEST, signOutRequestWorker);
}

function* authInitWorker() {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

  if (token) yield put(setUserToken(token));
}

function* signInRequestWorker({ payload }: AnyAction) {
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

    if (navigator.credentials) {
      const cred = new PasswordCredential({
        id: email,
        password,
      });

      yield navigator.credentials.store(cred);
    }

    yield put(setUserToken(response.access_token));
  }
}

function* signOutRequestWorker() {
  const isRequestRunning: boolean = yield select(signOutRequestStartedSelector);

  if (isRequestRunning) return;

  yield put(setSignOutRequestStarted(true));

  const { error } = yield Api.getInstance().logout();

  yield put(setSignOutRequestStarted(false));

  if (error) {
    yield put(setSignOutRequestError("Error while signing out"));
  } else {
    yield put(setSignOutRequestCompleted(true));

    yield put(setUserId(""));
    yield put(setUserToken(""));
  }
}
