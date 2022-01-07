import { call, fork, put, select, takeEvery } from "redux-saga/effects";
import {
  actionTypes,
  setSignInRequestCompleted,
  setSignInRequestError,
  setSignInRequestStarted,
  setSignOutRequestCompleted,
  setSignOutRequestError,
  setSignOutRequestStarted,
  setSignUpRequestCompleted,
  setSignUpRequestError,
  setSignUpRequestStarted,
} from "./actions";
import {
  signInRequestErrorSelector,
  signInRequestFailedSelector,
  signInRequestLoading,
  signOutRequestStartedSelector,
  signUpRequestStartedSelector,
} from "./selectors";
import { AnyAction } from "@reduxjs/toolkit";
import {
  setUserId,
  setUserInfo,
  setUserToken,
  userInfoRequestErrorSelector,
  userInfoRequestFailedSelector,
  userInfoRequestWorker,
  userInfoSelector,
} from "../user";
import { LOCAL_STORAGE_KEYS } from "../../helpers/localStorage/consts";
import Api from "../../helpers/api";
import { AuthResult } from "@directus/sdk";
import { UserModel } from "../../helpers/api/model";
import ReactGA from "react-ga4";

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
  yield put(setSignInRequestCompleted(false));
  yield put(setSignInRequestError(""));

  const {
    response: signInResponse,
    error: signInError,
  }: { response: AuthResult; error: any } = yield Api.getInstance()
    .login({
      email,
      password,
    })
    .then((response: AuthResult) => ({ response }))
    .catch((error: any) => ({ error }));

  if (signInError) {
    yield put(
      setSignInRequestError("Something went wrong. Please try again later.")
    );
    return;
  }

  yield call(userInfoRequestWorker);

  const userInfoError: boolean = yield select(userInfoRequestFailedSelector);

  if (userInfoError) {
    yield put(
      setSignInRequestError(yield select(userInfoRequestErrorSelector))
    );
    return;
  }

  yield put(setSignInRequestStarted(false));
  yield put(setSignInRequestCompleted(true));

  if (navigator.credentials && window.PasswordCredential) {
    const userInfo: UserModel = yield select(userInfoSelector);

    const iconUrl = `${process.env.REACT_APP_API_URL}/assets/${userInfo.avatar}?key=256-256`;

    const cred = new PasswordCredential({
      id: email,
      name: `${userInfo.first_name} ${userInfo.last_name}`,
      password,
      ...(userInfo.avatar && { iconURL: iconUrl }),
    });

    yield navigator.credentials.store(cred);
  }

  ReactGA.gtag("event", "login", {
    event_category: "auth",
    event_label: "login",
  });

  yield put(setUserToken(signInResponse.access_token));
}

function* signUpRequestWorker({ payload }: AnyAction) {
  const isRequestRunning: boolean = yield select(signUpRequestStartedSelector);

  if (isRequestRunning) return;

  const { email, password, username } = payload;

  yield put(setSignUpRequestStarted(true));
  yield put(setSignUpRequestCompleted(false));
  yield put(setSignUpRequestError(""));

  const { error: signUpError }: { response: any; error: any } =
    yield Api.getInstance()
      .items("directus_users")
      .createOne({
        email,
        password,
        first_name: username,
      })
      .then((response: any) => ({ response }))
      .catch((error: any) => ({ error }));

  if (signUpError) {
    yield put(setSignUpRequestStarted(false));
    yield put(
      setSignUpRequestError("Something went wrong. Please try again later.")
    );
    return;
  }

  yield call<(payload: any) => void>(signInRequestWorker, {
    payload: { email, password },
  });

  const signInError: boolean = yield select(signInRequestFailedSelector);

  if (signInError) {
    yield put(setSignUpRequestStarted(false));
    yield put(setSignUpRequestError(yield select(signInRequestErrorSelector)));
    return;
  }

  ReactGA.gtag("event", "sign_up", {
    event_category: "auth",
    event_label: "sign_up",
  });

  yield put(setSignUpRequestStarted(false));
  yield put(setSignUpRequestCompleted(true));
}

function* signOutRequestWorker() {
  try {
    const isRequestRunning: boolean = yield select(
      signOutRequestStartedSelector
    );

    if (isRequestRunning) return;

    yield put(setSignOutRequestStarted(true));
    yield put(setSignOutRequestCompleted(false));
    yield put(setSignOutRequestError(""));

    yield call(Api.getInstance().logout.bind(Api.getInstance()));

    if (navigator.credentials)
      yield call(
        navigator.credentials.preventSilentAccess.bind(navigator.credentials)
      );

    yield put(setSignOutRequestCompleted(true));
  } finally {
    yield put(setSignOutRequestStarted(false));

    yield put(setUserId(false));
    yield put(setUserToken(false));
    yield put(setUserInfo(false));
  }
}
