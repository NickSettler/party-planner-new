import { EventsModuleT } from "./types/events.types";

export const EventsModuleState: EventsModuleT = {
  events: [],
  eventsRequestCompleted: false,
  eventsRequestError: "",
  eventsRequestStarted: false,
};
