import { EventsCardHookT, EventsCardPropsT } from "./EventsCard.types";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EventModel } from "../../../helpers/api/model";

const useEventsCard = ({
  events,
  runEventsRequest,
}: EventsCardPropsT): EventsCardHookT => {
  const navigate = useNavigate();

  const [filteredEvents, setFilteredEvents] = useState<EventModel[]>(events);
  const [query, setQuery] = useState<string>("");
  const [selectedEvents, setSelectedEvents] = useState<number[]>([]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    []
  );

  useEffect(() => {
    setFilteredEvents(
      events.filter((event) =>
        event.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [events, query]);

  const handleAllCheckboxClick = useCallback(() => {
    if (selectedEvents.length) setSelectedEvents([]);
    else setSelectedEvents(events.map((_, index) => index));
  }, [events, selectedEvents.length]);

  const handleItemCheckboxClick = useCallback(
    (e: React.MouseEvent, i: number) => {
      e.stopPropagation();

      if (selectedEvents.includes(i)) {
        setSelectedEvents(selectedEvents.filter((index) => index !== i));
      } else {
        setSelectedEvents([...selectedEvents, i]);
      }
    },
    [selectedEvents]
  );

  const handleItemClick = useCallback(
    (i: number) => {
      if (selectedEvents.length)
        if (selectedEvents.includes(i))
          setSelectedEvents(selectedEvents.filter((index) => index !== i));
        else setSelectedEvents([...selectedEvents, i]);
      else navigate(`/dashboard/events/${events[i].id}`);
    },
    [events, navigate, selectedEvents]
  );

  useEffect(() => {
    runEventsRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    filteredEvents,
    query,
    handleSearchChange,
    selectedEvents,
    handleItemCheckboxClick,
    handleItemClick,
    handleAllCheckboxClick,
  };
};

export default useEventsCard;
