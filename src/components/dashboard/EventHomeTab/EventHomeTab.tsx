import Masonry from "@mui/lab/Masonry";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import { eventsSelector } from "../../../modules/events";
import { Dispatch } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { EventHomeTabPropsT } from "./EventHomeTab.types";
import useEventHomeTab from "./useEventHomeTab";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Add from "@mui/icons-material/Add";
import Skeleton from "@mui/material/Skeleton";
import List from "@mui/material/List";
import Checkbox from "@mui/material/Checkbox";
import Fade from "@mui/material/Fade";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import { setMemberCameStatus } from "../../../modules/members";

const EventHomeTab = (props: EventHomeTabPropsT): JSX.Element => {
  const { currentEvent, handleMemberCheckboxClick } = useEventHomeTab(props);

  return (
    <Container sx={{ mt: 4 }}>
      <Masonry columns={{ xs: 1, sm: 3 }}>
        <Card>
          <CardHeader
            title={currentEvent ? "Members" : <Skeleton width={"100%"} />}
            subheader={
              currentEvent ? (
                currentEvent?.members?.length ? (
                  `There are ${currentEvent.members.length} member${
                    currentEvent.members.length === 1 ? "" : "s"
                  }`
                ) : (
                  "There are no members"
                )
              ) : (
                <Skeleton width={"100%"} />
              )
            }
            action={
              <IconButton color={"secondary"}>
                <Add />
              </IconButton>
            }
          />
          <CardContent>
            <List disablePadding>
              {typeof currentEvent?.members?.[0] === "object" &&
                currentEvent.members.map((member, i) => {
                  if (
                    !(
                      member?.directus_users_id?.first_name ||
                      member?.directus_users_id?.last_name
                    )
                  )
                    return <li key={i} />;
                  return (
                    <Fade in timeout={1500} key={member?.directus_users_id?.id}>
                      <ListItem disablePadding>
                        <ListItemText
                          primary={`
                      ${member.directus_users_id.first_name || ""} ${
                            member.directus_users_id.last_name || ""
                          }`}
                        />
                        <ListItemSecondaryAction sx={{ right: 0 }}>
                          <Checkbox
                            sx={{ right: -9 }}
                            checked={member.came}
                            onChange={(e) =>
                              handleMemberCheckboxClick(
                                e,
                                member.directus_users_id.id
                              )
                            }
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Fade>
                  );
                })}
            </List>
          </CardContent>
        </Card>
      </Masonry>
    </Container>
  );
};

const mapStateToProps = (state: any) => ({
  events: eventsSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setMemberCameStatus: (
    eventId: string | number,
    memberId: string | number,
    came: boolean
  ) => dispatch(setMemberCameStatus(eventId, memberId, came)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventHomeTab);
