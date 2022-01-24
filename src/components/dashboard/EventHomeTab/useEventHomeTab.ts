import { EventHomeTabHookT, EventHomeTabPropsT } from "./EventHomeTab.types";
import { EventModel } from "../../../helpers/api/model";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useEventHomeTab = ({
  events,
  setMemberCameStatus,
  setMemberModalId,
}: EventHomeTabPropsT): EventHomeTabHookT => {
  const params = useParams();

  const [currentEvent, setCurrentEvent] = useState<EventModel>(
    events.find((event: EventModel) => ~~event.id === ~~params.id!)!
  );

  useEffect(() => {
    setCurrentEvent(events.find((event) => ~~event.id === ~~params.id!)!);
  }, [events, params.id]);

  const handleMemberItemClick = useCallback(
    (e: React.MouseEvent, id: string | number) => {
      e.stopPropagation();
      setMemberModalId(id);
    },
    [setMemberModalId]
  );

  const handleMemberCheckboxClick = (
    e: React.ChangeEvent<HTMLInputElement>,
    memberId: string | number
  ) => {
    const { checked } = e.target as HTMLInputElement;

    setMemberCameStatus(params.id!, `${memberId}`, checked);
  };

  return {
    currentEvent,
    handleMemberCheckboxClick,
    handleMemberItemClick,
  };
};

export default useEventHomeTab;
