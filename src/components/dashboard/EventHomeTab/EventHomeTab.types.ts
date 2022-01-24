import { EventModel } from "../../../helpers/api/model";
import React from "react";

export type EventHomeTabPropsT = {
  events: Array<EventModel>;
  setMemberCameStatus: (
    eventId: string,
    memberId: string,
    status: boolean
  ) => void;
  memberModalId: string;
  setMemberModalId: (id: string | number) => void;
};

export type EventHomeTabHookT = {
  currentEvent: EventModel;
  handleMemberCheckboxClick: (
    e: React.ChangeEvent<HTMLInputElement>,
    memberId: string | number
  ) => void;
  handleMemberItemClick: (e: React.MouseEvent, id: string | number) => void;
};
