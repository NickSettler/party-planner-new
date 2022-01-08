import { TabPanelPropsT } from "./TabPanel.types";

const TabPanel = (props: TabPanelPropsT): JSX.Element => {
  const { children, index, value, ...other } = props;

  return (
    <div hidden={value !== index} role={"tabpanel"} {...other}>
      {value === index && children}
    </div>
  );
};

export default TabPanel;
