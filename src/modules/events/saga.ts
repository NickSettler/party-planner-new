import { all, select, put, takeEvery } from "redux-saga/effects";
import {
  actionTypes,
  eventsRequestStartedSelector,
  setEvents,
  setEventsRequestCompleted,
  setEventsRequestError,
  setEventsRequestStarted,
} from ".";
import Api from "../../helpers/api";
import { ManyItems } from "@directus/sdk";
import { EventModel, PartyModel } from "../../helpers/api/model";

export function* eventsSaga() {
  yield all([takeEvery(actionTypes.RUN_EVENTS_REQUEST, eventsRequestWorker)]);
}

export function* eventsRequestWorker() {
  try {
    const isRequestRunning: boolean = yield select(
      eventsRequestStartedSelector
    );

    if (isRequestRunning) return;

    yield put(setEventsRequestStarted(true));
    yield put(setEventsRequestCompleted(false));
    yield put(setEventsRequestError(""));

    const { response, error }: { response: ManyItems<EventModel>; error: any } =
      yield Api.getInstance()
        .items("parties")
        .readMany({
          filter: {
            status: "published",
          },
        })
        .then((response) => ({ response }))
        .catch((error) => ({ error }));

    if (error) {
      yield put(setEventsRequestError(error.message));
    } else {
      yield put(setEventsRequestCompleted(true));
      if (response.data) yield put(setEvents(response.data as PartyModel[]));
    }
  } finally {
    yield put(setEventsRequestStarted(false));
  }
}
