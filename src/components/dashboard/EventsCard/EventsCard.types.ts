import React from "react";
import { EventModel } from "../../../helpers/api/model";

export type EventsCardPropsT = {
  events: EventModel[];
  runEventsRequest: () => void;
};

export type EventsCardHookT = {
  filteredEvents: EventModel[];
  query: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedEvents: Array<number>;
  handleItemCheckboxClick: (e: React.MouseEvent, i: number) => void;
  handleItemClick: (i: number) => void;
  handleAllCheckboxClick: () => void;
};
