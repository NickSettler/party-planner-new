import { connect } from "react-redux";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import Checkbox from "@mui/material/Checkbox";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Dispatch } from "@reduxjs/toolkit";
import { eventsSelector, runEventsRequest } from "../../../modules/events";
import useEventsCard from "./useEventsCard";
import { EventsCardPropsT } from "./EventsCard.types";
import { EventModel } from "../../../helpers/api/model";
import {
  EmptyIllustration,
  EventsTableToolbar,
  SearchTextField,
} from "./styled/EventsCard.styled";
import SearchIcon from "@mui/icons-material/Search";
import EmptyImg from "../../../assets/images/empty_illustration.svg";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const EventsCard = (props: EventsCardPropsT): JSX.Element => {
  const {
    filteredEvents,
    query,
    handleSearchChange,
    selectedEvents,
    handleItemCheckboxClick,
    handleItemClick,
    handleAllCheckboxClick,
  } = useEventsCard(props);

  const theme = useTheme();
  const emptyStackDirection = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Card>
      <EventsTableToolbar>
        <SearchTextField
          type={"text"}
          placeholder={"Search events..."}
          value={query}
          onChange={handleSearchChange}
          startAdornment={
            <InputAdornment position={"start"}>
              <SearchIcon />
            </InputAdornment>
          }
        />
      </EventsTableToolbar>

      {filteredEvents.length ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding={"checkbox"}>
                  <Checkbox
                    onClick={handleAllCheckboxClick}
                    checked={selectedEvents.length === filteredEvents.length}
                    indeterminate={
                      !!selectedEvents.length &&
                      selectedEvents.length !== filteredEvents.length
                    }
                  />
                </TableCell>
                <TableCell>Event</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEvents.map((event: EventModel, i: number) => (
                <TableRow
                  hover
                  key={event.id}
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleItemClick(i)}
                >
                  <TableCell padding={"checkbox"}>
                    <Checkbox
                      checked={selectedEvents.includes(i)}
                      onClick={(e) => handleItemCheckboxClick(e, i)}
                    />
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
      ) : (
        <Stack
          direction={emptyStackDirection ? "row" : "column"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={3}
          sx={{ p: 2 }}
        >
          <EmptyIllustration>
            <Box component={"img"} src={EmptyImg} />
          </EmptyIllustration>
          <Typography variant={"h6"}>No events found.</Typography>
        </Stack>
      )}
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
