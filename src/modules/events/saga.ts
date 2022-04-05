import { all, select, put, takeEvery } from "redux-saga/effects";
import {
  actionTypes,
  eventRequestStartedSelector,
  eventsRequestStartedSelector,
  mergeEvent,
  setEventRequestCompleted,
  setEventRequestError,
  setEventRequestStarted,
  setEvents,
  setEventsRequestCompleted,
  setEventsRequestError,
  setEventsRequestStarted,
} from ".";
import Api from "../../helpers/api";
import { ManyItems } from "@directus/sdk";
import { EventModel, PartyModel } from "../../helpers/api/model";
import { AnyAction } from "@reduxjs/toolkit";

export function* eventsSaga() {
  yield all([
    takeEvery(actionTypes.RUN_EVENTS_REQUEST, eventsRequestWorker),
    takeEvery(actionTypes.RUN_EVENT_REQUEST, eventRequestWorker),
  ]);
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
        .readByQuery({
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

export function* eventRequestWorker({ payload }: AnyAction) {
  try {
    const isRequestRunning: boolean = yield select(eventRequestStartedSelector);

    if (isRequestRunning) return;

    const { eventId } = payload;

    yield put(setEventRequestStarted(true));
    yield put(setEventRequestCompleted(false));
    yield put(setEventRequestError(""));

    const { response, error }: { response: ManyItems<EventModel>; error: any } =
      yield Api.getInstance()
        .items("parties")
        .readByQuery({
          filter: {
            status: "published",
            id: {
              _eq: eventId,
            },
          },
          fields: "*.*.*",
        })
        .then((response) => ({ response }))
        .catch((error) => ({ error }));

    if (error) {
      yield put(setEventRequestError(error.message));
    } else {
      yield put(setEventRequestCompleted(true));
      if (response.data) yield put(mergeEvent(response.data[0] as EventModel));
    }
  } finally {
    yield put(setEventRequestStarted(false));
  }
}
