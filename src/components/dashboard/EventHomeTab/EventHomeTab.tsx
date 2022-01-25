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
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import {
  memberModalIdSelector,
  setMemberCameStatus,
  setMemberModalId,
} from "../../../modules/members";
import MemberModal from "../MemberModal/MemberModal";
import ListItemButton from "@mui/material/ListItemButton";
import Stack from "@mui/material/Stack";
import React from "react";
import EventDetailsCard from "../EventDetailsCard/EventDetailsCard";

const EventHomeTab = (props: EventHomeTabPropsT): JSX.Element => {
  const { memberModalId } = props;

  const { currentEvent, handleMemberCheckboxClick, handleMemberItemClick } =
    useEventHomeTab(props);

  return (
    <Container sx={{ mt: 4 }}>
      <Masonry
        columns={{ xs: 1, sm: 2 }}
        spacing={{ xs: 0, sm: 3 }}
        sx={(theme) => ({
          "& > .MuiCard-root": {
            [theme.breakpoints.down("sm")]: {
              marginBottom: theme.spacing(3),
            },
          },
        })}
      >
        <EventDetailsCard />
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
          <CardContent sx={{ px: 0 }}>
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
                      <Stack direction={"row"}>
                        <ListItemButton
                          sx={(theme) => ({ paddingLeft: theme.spacing(3) })}
                          onClick={(e) => {
                            handleMemberItemClick(
                              e,
                              member.directus_users_id.id
                            );
                          }}
                        >
                          <ListItemText
                            primary={`
                      ${member.directus_users_id.first_name || ""} ${
                              member.directus_users_id.last_name || ""
                            }`}
                          />
                          <ListItemSecondaryAction
                            sx={(theme) => ({ right: theme.spacing(3) })}
                          >
                            <Checkbox
                              sx={{ right: -9 }}
                              checked={member.came}
                              disableRipple
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              onChange={(e) => {
                                e.stopPropagation();
                                e.nativeEvent.stopImmediatePropagation();

                                handleMemberCheckboxClick(
                                  e,
                                  member.directus_users_id.id
                                );
                              }}
                              onMouseDown={(e) => e.stopPropagation()}
                            />
                          </ListItemSecondaryAction>
                        </ListItemButton>
                      </Stack>
                    </Fade>
                  );
                })}
            </List>
          </CardContent>
        </Card>
      </Masonry>
      <MemberModal isOpen={!!memberModalId} />
    </Container>
  );
};

const mapStateToProps = (state: any) => ({
  events: eventsSelector(state),
  memberModalId: memberModalIdSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setMemberCameStatus: (
    eventId: string | number,
    memberId: string | number,
    came: boolean
  ) => dispatch(setMemberCameStatus(eventId, memberId, came)),
  setMemberModalId: (id: string | number) => dispatch(setMemberModalId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventHomeTab);
