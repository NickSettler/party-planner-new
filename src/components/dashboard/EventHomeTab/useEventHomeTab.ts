import { EventHomeTabHookT, EventHomeTabPropsT } from "./EventHomeTab.types";
import { EventModel } from "../../../helpers/api/model";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useEventHomeTab = ({
  events,
  setMemberCameStatus,
}: EventHomeTabPropsT): EventHomeTabHookT => {
  const params = useParams();

  const [currentEvent, setCurrentEvent] = useState<EventModel>(
    events.find((event: EventModel) => ~~event.id === ~~params.id!)!
  );

  useEffect(() => {
    setCurrentEvent(events.find((event) => ~~event.id === ~~params.id!)!);
  }, [events, params.id]);

  const handleMemberCheckboxClick = (
    e: React.ChangeEvent<HTMLInputElement>,
    memberId: string | number
  ) => {
    const { checked } = e.target;

    setMemberCameStatus(params.id!, `${memberId}`, checked);
  };

  return {
    currentEvent,
    handleMemberCheckboxClick,
  };
};

export default useEventHomeTab;
