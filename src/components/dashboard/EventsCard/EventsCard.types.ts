import { EventModel } from "../../../helpers/api/model";

export type EventsCardPropsT = {
  events: EventModel[];
  runEventsRequest: () => void;
};

export type EventsCardHookT = {};
