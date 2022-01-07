import { connect } from "react-redux";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import { Checkbox, TableCell, TableHead, TableRow } from "@mui/material";
import { Dispatch } from "@reduxjs/toolkit";
import { eventsSelector, runEventsRequest } from "../../../modules/events";
import useEventsCard from "./useEventsCard";
import { EventsCardPropsT } from "./EventsCard.types";
import { EventModel } from "../../../helpers/api/model";

const EventsCard = (props: EventsCardPropsT): JSX.Element => {
  const { events } = props;

  useEventsCard(props);

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding={"checkbox"}>
                <Checkbox />
              </TableCell>
              <TableCell>Event</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event: EventModel) => (
              <TableRow>
                <TableCell padding={"checkbox"}>
                  <Checkbox />
                </TableCell>
                <TableCell>{event.name}</TableCell>
                <TableCell>
                  {new Date(event.date_created).toUTCString()}
                </TableCell>
                <TableCell>
                  <i>Unknown</i>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

const mapStateToProps = (state: any) => ({
  events: eventsSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  runEventsRequest: () => dispatch(runEventsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsCard);
