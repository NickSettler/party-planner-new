import { fork, put, select, takeEvery } from "redux-saga/effects";
import {
  actionTypes,
  setUserInfo,
  setUserInfoRequestCompleted,
  setUserInfoRequestError,
  setUserInfoRequestStarted,
} from "./actions";
import { userInfoRequestStartedSelector } from "./selectors";
import Api from "../../helpers/api";
import { PartialItem, UserItem } from "@directus/sdk";
import { UserModel } from "../../helpers/api/model";

export function* userSaga() {
  yield fork(userInitWorker);

  yield takeEvery(actionTypes.RUN_USER_INFO_REQUEST, userInfoRequestWorker);
}

export function* userInitWorker() {
  yield put({
    type: actionTypes.RUN_USER_INFO_REQUEST,
  });
}

export function* userInfoRequestWorker() {
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

  yield put(setUserInfoRequestStarted(false));

  if (response) {
    yield put(setUserInfoRequestCompleted(true));
    yield put(setUserInfo(response as UserModel));
  } else {
    yield put(setUserInfoRequestError("Something went wrong"));
  }
}
