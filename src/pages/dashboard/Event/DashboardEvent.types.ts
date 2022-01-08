import { EventModel } from "../../../helpers/api/model";
import React from "react";

export type DashboardEventPropsT = {
  events: Array<EventModel>;
  runEventsRequest: () => void;
  runEventRequest: (id: string) => void;
};

export type DashboardEventHookT = {
  tabValue: number;
  handleTabClick: (e: React.SyntheticEvent, v: number) => void;
};
