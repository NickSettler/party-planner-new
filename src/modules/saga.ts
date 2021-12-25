import { all, fork } from "redux-saga/effects";
import { authSaga } from "./auth";
import { userSaga } from "./user";

function* rootSaga() {
  yield all([fork(authSaga), fork(userSaga)]);
}

export default rootSaga;
