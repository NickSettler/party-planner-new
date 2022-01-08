import {
  DashboardEventHookT,
  DashboardEventPropsT,
} from "./DashboardEvent.types";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { generateEventLink } from "../../../helpers/menu/eventMenu";

const useDashboardEvent = ({
  runEventRequest,
}: DashboardEventPropsT): DashboardEventHookT => {
  const [tabValue, setTabValue] = useState<number>(0);

  const params = useParams();
  const navigate = useNavigate();

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
    tabValue,
    handleTabClick,
  };
};

export default useDashboardEvent;
