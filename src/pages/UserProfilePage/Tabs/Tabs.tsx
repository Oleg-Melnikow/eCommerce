import "./Tabs.scss";
import React, { ReactElement } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CustomTabPanel from "../TabPanel/TabPanel";

import TabPanelContent from "../EditableInput/TabPanelContent";

interface A11yPropsReturn {
  id: string;
  "aria-controls": string;
}

function a11yProps(index: number): A11yPropsReturn {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function BasicTabs(): JSX.Element {
  const [value, setValue] = React.useState(0);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "#727272" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Personal" {...a11yProps(0)} />
          <Tab label="Addresses" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <TabPanelContent tabContent="personal" />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TabPanelContent tabContent="addresses" />
      </CustomTabPanel>
    </Box>
  );
}

export default BasicTabs;
