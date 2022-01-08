import { EventModel } from "../../../helpers/api/model";

export type EventsModuleT = {
  events: EventModel[];

  eventsRequestStarted: boolean;
  eventsRequestCompleted: boolean;
  eventsRequestError: string;

  eventRequestStarted: boolean;
  eventRequestCompleted: boolean;
  eventRequestError: string;
};
