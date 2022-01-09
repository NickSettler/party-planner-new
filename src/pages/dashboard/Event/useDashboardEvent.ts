import {
  DashboardEventHookT,
  DashboardEventPropsT,
} from "./DashboardEvent.types";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { generateEventLink } from "../../../helpers/menu/eventMenu";
import { EventModel } from "../../../helpers/api/model";

const useDashboardEvent = ({
  events,
  runEventRequest,
}: DashboardEventPropsT): DashboardEventHookT => {
  const params = useParams();
  const navigate = useNavigate();

  const [tabValue, setTabValue] = useState<number>(0);
  const [currentEvent, setCurrentEvent] = useState<EventModel>(
    events.find((event: EventModel) => ~~event.id === ~~params.id!)!
  );

  useEffect(() => {
    setCurrentEvent(
      events.find((event: EventModel) => ~~event.id === ~~params.id!)!
    );
  }, [events, params.id]);

  useEffect(() => {
    runEventRequest(params.id!);
  }, [params.id, runEventRequest]);

  useEffect(() => {
    if (!params.tab)
      navigate(generateEventLink(params.id!, 0), { replace: true });
  }, [navigate, params]);

  const handleTabClick = useCallback(
    (e: React.SyntheticEvent, v: number) => {
      navigate(generateEventLink(params.id!, v));
      setTabValue(v);
    },
    [navigate, params.id]
  );

  return {
    currentEvent,
    tabValue,
    handleTabClick,
  };
};

export default useDashboardEvent;
