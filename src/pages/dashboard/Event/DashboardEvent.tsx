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
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { useTheme } from "@mui/material/styles";

const DashboardEvent = (props: DashboardEventPropsT): JSX.Element => {
  const { currentEvent, tabValue, handleTabClick } = useDashboardEvent(props);

  const theme = useTheme();

  return (
    <Stack>
      <Box sx={{ py: 2, px: 2.5 }}>
        {currentEvent ? (
          <Typography variant={"h5"}>{currentEvent?.name}</Typography>
        ) : (
          <Skeleton
            variant={"rectangular"}
            width={"25%"}
            height={`calc(${theme.typography.h5.fontSize} * ${theme.typography.h5.lineHeight})`}
          />
        )}
      </Box>
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
