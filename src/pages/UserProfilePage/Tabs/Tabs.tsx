import "./Tabs.scss";
import React, { useEffect, useState } from "react";
import useAuth from "hooks/use-auth";

import {
  UserPersonalData,
  UserAddressesData,
} from "types/UserProfileDataProps/UserProfileDataProps";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CustomTabPanel from "../TabPanel/TabPanel";
import TabPersonalData from "../TabPanelContent/TabUserPersonalData/TabPersonalData";
import BasicTable from "../TabPanelContent/TabAddressesData/TabAddressesData";

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
  const { user } = useAuth();

  const [userPersonalData, setUserPersonalData] = useState<UserPersonalData>();
  const [userAddressesData, setUserAddressesData] = useState<
    UserAddressesData[]
  >([]);

  useEffect(() => {
    if (user) {
      const { firstName, lastName, dateOfBirth, addresses } = user;
      setUserPersonalData({ firstName, lastName, dateOfBirth });
      setUserAddressesData(addresses);
    }
  }, [user]);

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
        {userPersonalData && <TabPersonalData userData={userPersonalData} />}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <BasicTable addressesData={userAddressesData} />
      </CustomTabPanel>
    </Box>
  );
}

export default BasicTabs;
