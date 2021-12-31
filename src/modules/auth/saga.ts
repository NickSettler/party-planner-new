import { fork, put, select, takeEvery } from "redux-saga/effects";
import {
  actionTypes,
  setSignInRequestCompleted,
  setSignInRequestError,
  setSignInRequestStarted,
  setSignOutRequestCompleted,
  setSignOutRequestStarted,
  setSignUpRequestError,
} from "./actions";
import {
  signInRequestLoading,
  signOutRequestStartedSelector,
  signUpRequestStartedSelector,
} from "./selectors";
import { AnyAction } from "@reduxjs/toolkit";
import { setUserId, setUserToken } from "../user";
import { LOCAL_STORAGE_KEYS } from "../../helpers/localStorage/consts";
import Api from "../../helpers/api_v2";
import {
  AuthLoginResponseT,
  AuthRegisterResponseT,
} from "../../helpers/api_v2/controllers/types/auth.types";
import { ApolloError } from "@apollo/client";

export function* authSaga() {
  yield fork(authInitWorker);

  yield takeEvery(actionTypes.RUN_SIGN_IN_REQUEST, signInRequestWorker);
  yield takeEvery(actionTypes.RUN_SIGN_UP_REQUEST, signUpRequestWorker);
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

  const {
    response,
    error,
  }: { response: AuthLoginResponseT; error: ApolloError } =
    yield Api.getInstance()
      .auth.login(email, password)
      .then((response) => ({ response }))
      .catch((error) => ({ error }));

  yield put(setSignInRequestStarted(false));

  if (error) {
    yield put(
      setSignInRequestError(
        (error.graphQLErrors[0].extensions as any).exception.data.message[0]
          .messages[0].message
      )
    );
  } else {
    yield put(setSignInRequestCompleted(true));

    if (navigator.credentials && window.PasswordCredential) {
      const cred = new PasswordCredential({
        id: email,
        name: response.user.username,
        password,
      });

      yield navigator.credentials.store(cred);
    }

    yield put(setUserToken(response.jwt));
  }
}

function* signUpRequestWorker({ payload }: AnyAction) {
  const isRequestRunning: boolean = yield select(signUpRequestStartedSelector);

  if (isRequestRunning) return;

  const { email, password, username } = payload;

  const {
    response,
    error,
  }: {
    response: AuthRegisterResponseT;
    error: ApolloError;
  } = yield Api.getInstance()
    .auth.register(email, username, password)
    .then((response: AuthRegisterResponseT) => ({ response }))
    .catch((error: ApolloError) => ({ error }));

  yield put(setSignInRequestStarted(false));

  if (error) {
    yield put(
      setSignUpRequestError(
        (error.graphQLErrors[0].extensions as any).exception.data.message[0]
          .messages[0].message
      )
    );
  } else {
    yield put(setSignInRequestCompleted(true));

    if (navigator.credentials && window.PasswordCredential) {
      const cred = new PasswordCredential({
        id: email,
        name: username,
        password,
      });

      yield navigator.credentials.store(cred);
    }

    yield put(setUserToken(response.jwt));
  }
}

function* signOutRequestWorker() {
  const isRequestRunning: boolean = yield select(signOutRequestStartedSelector);

  if (isRequestRunning) return;

  yield put(setSignOutRequestStarted(true));

  yield Api.getInstance().auth.logout();

  if (navigator.credentials) yield navigator.credentials.preventSilentAccess();

  yield put(setSignOutRequestStarted(false));
  yield put(setSignOutRequestCompleted(true));

  yield put(setUserId(""));
  yield put(setUserToken(""));
}
