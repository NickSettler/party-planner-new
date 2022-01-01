import { connect } from "react-redux";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { Outlet } from "react-router-dom";

const DashboardIndex = (): JSX.Element => {
  return (
    <>
      <Drawer variant={"permanent"} open>
        <Toolbar />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Outlet />
    </>
  );
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardIndex);
