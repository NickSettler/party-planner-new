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
  setMemberUpdateRequestCompleted,
  setMemberUpdateRequestError,
  setMemberUpdateRequestStarted,
} from ".";
import Api from "../../helpers/api";
import { ManyItems, OneItem } from "@directus/sdk";
import {
  EventModel,
  PartiesToDirectusUsersModel,
} from "../../helpers/api/model";
import { AnyAction } from "@reduxjs/toolkit";
import { eventsSelector, setEvents } from "../events";
import { cloneDeep, intersectionBy } from "lodash";
import { API_TABLES } from "../../helpers/api/consts";
import { Channel } from "redux-saga";

export function* membersSaga() {
  yield all([takeEvery(actionTypes.RUN_MEMBERS_REQUEST, membersRequestWorker)]);

  yield all([fork(membersStatusSaga), fork(membersUpdateRequestSaga)]);
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

export function* membersUpdateRequestSaga() {
  const channel: Channel<any> = yield actionChannel(
    actionTypes.RUN_MEMBER_UPDATE_REQUEST
  );

  while (true) {
    const action: AnyAction = yield take(channel);
    yield call(memberUpdateRequestWorker, action);
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

    const newMembersStatuses = event.members.map((member) => ({
      id: member.id,
      came: member.came,
    }));

    const initialMembersStatuses = initialEvents[eventIndex].members.map(
      (member) => ({
        id: member.id,
        came: member.came,
      })
    );

    const { error }: { response: ManyItems<EventModel>; error: any } =
      yield Api.getInstance()
        .items(API_TABLES.PARTIES)
        .updateOne(eventId, {
          members: intersectionBy(
            newMembersStatuses,
            initialMembersStatuses,
            "id"
          ),
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

export function* memberUpdateRequestWorker({ payload }: AnyAction) {
  const { memberInfo }: { memberInfo: PartiesToDirectusUsersModel } = payload;
  const { id, role, came, parties_id } = memberInfo;
  const eventId = parties_id.id;

  try {
    yield put(setMemberUpdateRequestStarted(true));
    yield put(setMemberUpdateRequestCompleted(false));
    yield put(setMemberUpdateRequestError(""));

    const {
      response,
      error,
    }: {
      response: OneItem<PartiesToDirectusUsersModel<"API">>;
      error: any;
    } = yield Api.getInstance()
      .items(API_TABLES.PARTIES_DIRECTUS_USERS)
      .updateOne(id, {
        came,
        role,
      })
      .then((response) => ({
        response,
      }))
      .catch((error) => ({ error }));

    if (error) {
      yield put(setMemberUpdateRequestError("Error updating member"));
    } else {
      yield put(setMemberUpdateRequestCompleted(true));
      const events: Array<EventModel> = yield select(eventsSelector);
      const eventIndex = events.findIndex((event) => event.id === ~~eventId)!;
      const event = events[eventIndex];

      event.members = event.members.map((member) => {
        if (member.id === id && response) {
          member.role = response.role || member.role;
          member.came =
            typeof response.came === "boolean" ? response.came : member.came;
        }

        return member;
      });

      events[eventIndex] = cloneDeep(event);

      yield put(setEvents(events));
    }
  } finally {
    yield put(setMemberUpdateRequestStarted(false));
  }
}
