import { EventsCardHookT, EventsCardPropsT } from "./EventsCard.types";
import { useEffect } from "react";

const useEventsCard = ({
  events,
  runEventsRequest,
}: EventsCardPropsT): EventsCardHookT => {
  useEffect(() => {
    if (events.length === 0) {
      runEventsRequest();
    }
  }, [events, runEventsRequest]);

  return {};
};

export default useEventsCard;
