import { all, fork } from "redux-saga/effects";
import { authSaga } from "./auth";
import { userSaga } from "./user";
import { eventsSaga } from "./events";
import { membersSaga } from "./members";

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(userSaga),
    fork(eventsSaga),
    fork(membersSaga),
  ]);
}

export default rootSaga;
