import { connect } from "react-redux";
import { EventDetailsCardProps } from "./EventDetailsCard.types";
import useEventDetailsCard from "./useEventDetailsCard";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Event from "@mui/icons-material/Event";
import Typography from "@mui/material/Typography";
import Spacer from "../../../uikit/Spacer";
import Map from "@mui/icons-material/Map";
import Box from "@mui/material/Box";
import { eventsSelector } from "../../../modules/events";
import IconButton from "@mui/material/IconButton";
import Navigation from "@mui/icons-material/Navigation";
import Skeleton from "@mui/material/Skeleton";
import "moment/locale/ru";
import "moment/locale/cs";
import moment from "moment/moment";

const EventDetailsCard = (props: EventDetailsCardProps): JSX.Element => {
  const { mapImageUrl, addressInfo, currentEvent } = useEventDetailsCard(props);

  return (
    <Card>
      <CardHeader title="Event Details" />
      <CardContent>
        <Stack direction={"column"} gap={1.5}>
          {currentEvent?.datetime && (
            <Stack direction={"row"} gap={1} alignItems={"center"}>
              <Event color={"primary"} />
              <Typography variant={"body1"}>
                {moment(new Date(currentEvent.datetime))
                  .locale(navigator.language)
                  .format("LLL")}
              </Typography>
            </Stack>
          )}
          {currentEvent?.location && mapImageUrl && (
            <Stack direction={"column"} gap={1}>
              {addressInfo ? (
                <Stack direction={"row"} gap={1} alignItems={"flex-start"}>
                  <Map color={"primary"} />
                  <Typography variant={"body1"}>
                    {addressInfo.properties.display_name}
                  </Typography>
                  <Spacer />
                  <IconButton
                    href={`https://www.google.com/maps/place/${currentEvent.location.coordinates[1]},${currentEvent.location.coordinates[0]}`}
                    target={"_blank"}
                    color={"secondary"}
                    sx={{ mt: -1, mr: -1 }}
                  >
                    <Navigation />
                  </IconButton>
                </Stack>
              ) : (
                <Stack direction={"row"} gap={1} alignItems={"flex-start"}>
                  <Skeleton variant={"rectangular"} height={24} width={24} />
                  <Skeleton variant={"text"} sx={{ flexGrow: 1 }} />
                  <Skeleton variant={"rectangular"} height={24} width={24} />
                </Stack>
              )}
              <a
                href={`https://www.google.com/maps/place/${currentEvent.location.coordinates[1]},${currentEvent.location.coordinates[0]}`}
                target={"_blank"}
                rel={"noreferrer nofollow"}
              >
                <Box
                  component={"img"}
                  src={mapImageUrl}
                  sx={(theme) => ({
                    width: "100%",
                    borderRadius: `${theme.shape.borderRadius}px`,
                  })}
                />
              </a>
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state: any) => ({
  events: eventsSelector(state),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailsCard);
