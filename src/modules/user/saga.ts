import { all, fork, put, select, takeEvery } from "redux-saga/effects";
import {
  actionTypes,
  setUserInfo,
  setUserInfoRequestCompleted,
  setUserInfoRequestError,
  setUserInfoRequestStarted,
} from "./actions";
import { actionTypes as authActionTypes } from "../auth";
import { userInfoRequestStartedSelector } from "./selectors";
import Api from "../../helpers/api";
import { PartialItem, UserItem } from "@directus/sdk";
import { UserModel } from "../../helpers/api/model";
import { AnyAction } from "@reduxjs/toolkit";
import { Task } from "redux-saga";
import { LOCAL_STORAGE_KEYS } from "../../helpers/localStorage/consts";

export function* userSaga() {
  yield fork(userInitWorker);

  const tasks: Array<Task> = yield all([
    takeEvery(actionTypes.RUN_USER_INFO_REQUEST, userInfoRequestWorker),
  ]);

  yield takeEvery("*", (a) =>
    userSagaMiddlewareWorker({
      ...a,
      payload: {
        tasks,
      },
    })
  );
}

export function* userSagaMiddlewareWorker(a: AnyAction) {
  if (!a.type.startsWith("user/")) return;

  if (!a.type.includes("RUN")) return;

  if (a.type === actionTypes.RUN_USER_INFO_REQUEST) {
    const isAuthActive =
      parseInt(
        localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_EXPIRES_AT) || "0"
      ) > Date.now();

    const isTokenStored = !!localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

    if (!isAuthActive && isTokenStored) {
      a.payload.tasks.forEach((t: Task) => t.cancel());
      yield put({ type: authActionTypes.RUN_SIGN_OUT_REQUEST });
    }

    const isAuthed = isAuthActive && isTokenStored;

    if (!isAuthed) {
      a.payload.tasks.forEach((t: Task) => t.cancel());
    }
  }
}

export function* userInitWorker() {
  yield put({
    type: actionTypes.RUN_USER_INFO_REQUEST,
  });
}

export function* userInfoRequestWorker() {
  try {
    const isRequestRunning: boolean = yield select(
      userInfoRequestStartedSelector
    );

    if (isRequestRunning) return;

    yield put(setUserInfoRequestStarted(true));
    yield put(setUserInfoRequestCompleted(false));
    yield put(setUserInfoRequestError(""));

    const { response }: { response: PartialItem<UserModel>; error: any } =
      yield Api.getInstance()
        .users.me.read()
        .then(
          (response: PartialItem<UserItem<UserModel>>) => ({ response }),
          (error) => ({ error })
        );

    if (response) {
      yield put(setUserInfoRequestCompleted(true));
      yield put(setUserInfo(response as UserModel));
    } else {
      yield put(setUserInfoRequestError("Something went wrong"));
    }
  } finally {
    yield put(setUserInfoRequestStarted(false));
  }
}
