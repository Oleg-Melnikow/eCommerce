import React, { SyntheticEvent, useEffect, useState } from "react";
import useAuth from "hooks/use-auth";
import { UserPersonalData } from "types/UserProfileDataProps/UserProfileDataProps";
import { ChangePasswordProfile } from "components/ChangePasswordProfile/ChangePasswordProfile";
import { Box, Tab, Tabs } from "@mui/material";
import CustomTabPanel from "../TabPanel/TabPanel";
import TabPersonalData from "../TabPanelContent/TabUserPersonalData/TabPersonalData";
import AddressesTable from "../TabPanelContent/TabAddressesData/TabAddressesData";
import "./Tabs.scss";

function BasicTabs(): JSX.Element {
  const { user } = useAuth();
  const [value, setValue] = React.useState(0);
  const [userPersonalData, setUserPersonalData] = useState<UserPersonalData>();

  useEffect(() => {
    if (user) {
      const { firstName, lastName, dateOfBirth } = user;
      setUserPersonalData({ firstName, lastName, dateOfBirth });
    }
  }, [user]);

  const handleChange = (event: SyntheticEvent, newValue: number): void => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "#727272" }}>
        <Tabs value={value} onChange={handleChange}>
          {["Personal", "Password", "Addresses"].map((tab, index) => {
            return <Tab sx={{ p: 1 }} key={tab} label={tab} value={index} />;
          })}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {userPersonalData && <TabPersonalData userData={userPersonalData} />}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ChangePasswordProfile />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <AddressesTable />
      </CustomTabPanel>
    </Box>
  );
}

export default BasicTabs;
