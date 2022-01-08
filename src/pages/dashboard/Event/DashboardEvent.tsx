import { connect } from "react-redux";
import {
  eventsSelector,
  runEventRequest,
  runEventsRequest,
} from "../../../modules/events";
import { Dispatch } from "@reduxjs/toolkit";
import Tabs from "@mui/material/Tabs";
import { DashboardEventPropsT } from "./DashboardEvent.types";
import useDashboardEvent from "./useDashboardEvent";
import Tab from "@mui/material/Tab";
import Stack from "@mui/material/Stack";
import eventTabMenu from "../../../helpers/menu/eventMenu";
import { MenuItemT } from "../../../helpers/menu/menu.types";
import TabPanel from "../../../uikit/TabPanel";
import EventHomeTab from "../../../components/dashboard/EventHomeTab";

const DashboardEvent = (props: DashboardEventPropsT): JSX.Element => {
  const { tabValue, handleTabClick } = useDashboardEvent(props);

  return (
    <Stack>
      <Tabs value={tabValue} onChange={handleTabClick}>
        {eventTabMenu.map((menuItem: MenuItemT) => (
          <Tab key={menuItem.title} label={menuItem.title} disableRipple />
        ))}
      </Tabs>
      <TabPanel index={0} value={tabValue}>
        <EventHomeTab />
      </TabPanel>
      <TabPanel index={1} value={tabValue}>
        123
      </TabPanel>
    </Stack>
  );
};

const mapStateToProps = (state: any) => ({
  events: eventsSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  runEventsRequest: () => dispatch(runEventsRequest()),
  runEventRequest: (id: string) => dispatch(runEventRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardEvent);
