import { connect } from "react-redux";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EventsCard from "../../../components/dashboard/EventsCard/";

const DashboardEvents = (): JSX.Element => {
  return (
    <Container>
      <Stack direction={"row"} sx={{ mb: 5 }}>
        <Typography variant={"h4"}>Events</Typography>
      </Stack>

      <EventsCard />
    </Container>
  );
};

export default connect(null, null)(DashboardEvents);
