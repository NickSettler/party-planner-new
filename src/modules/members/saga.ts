import {
  all,
  select,
  put,
  takeEvery,
  fork,
  actionChannel,
  take,
  call,
} from "redux-saga/effects";
import {
  actionTypes,
  setMemberStatusChangeCompleted,
  setMemberStatusChangeError,
  setMemberStatusChangeStarted,
} from ".";
import Api from "../../helpers/api";
import { ManyItems } from "@directus/sdk";
import { EventModel } from "../../helpers/api/model";
import { AnyAction } from "@reduxjs/toolkit";
import { eventsSelector, setEvents } from "../events";
import { cloneDeep } from "lodash";
import { API_TABLES } from "../../helpers/api/consts";
import { Channel } from "redux-saga";

export function* membersSaga() {
  yield all([takeEvery(actionTypes.RUN_MEMBERS_REQUEST, membersRequestWorker)]);

  yield fork(membersStatusSaga);
}

export function* membersStatusSaga() {
  const channel: Channel<any> = yield actionChannel(
    actionTypes.SET_MEMBER_CAME_STATUS
  );

  while (true) {
    const action: AnyAction = yield take(channel);
    yield call(memberStatusChangeWorker, action);
  }
}

export function* membersRequestWorker() {}

export function* memberStatusChangeWorker({ payload }: AnyAction) {
  const { eventId, memberId, came } = payload;

  let events: EventModel[] = yield select(eventsSelector);
  const initialEvents = cloneDeep(events);
  const eventIndex = events.findIndex((event) => event.id === ~~eventId)!;
  const event = events[eventIndex];

  try {
    yield put(setMemberStatusChangeStarted(true));
    yield put(setMemberStatusChangeCompleted(false));
    yield put(setMemberStatusChangeError(""));

    event.members.find(
      (member) => member.directus_users_id.id === memberId
    )!.came = came;

    events[eventIndex] = cloneDeep(event);

    yield put(setEvents(events));

    const { error }: { response: ManyItems<EventModel>; error: any } =
      yield Api.getInstance()
        .items(API_TABLES.PARTIES)
        .updateOne(eventId, {
          members: event.members,
        })
        .then((response) => ({ response }))
        .catch((error) => ({ error }));

    if (error) {
      yield put(setMemberStatusChangeError(error.message));
      yield put(setEvents(initialEvents));
    } else {
      yield put(setMemberStatusChangeCompleted(true));
    }
  } finally {
    yield put(setMemberStatusChangeStarted(false));
  }
}
