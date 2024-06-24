import React, { SyntheticEvent } from "react";
import { ChangePasswordProfile } from "components/ChangePasswordProfile/ChangePasswordProfile";
import { PersonalInformation } from "components/PersonalInformation/PersonalInformation";
import { Box, Tab, Tabs } from "@mui/material";
import CustomTabPanel from "../TabPanel/TabPanel";
import AddressesTable from "../TabPanelContent/TabAddressesData/TabAddressesData";
import "./Tabs.scss";

function BasicTabs(): JSX.Element {
  const [value, setValue] = React.useState(0);

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
        <PersonalInformation />
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
