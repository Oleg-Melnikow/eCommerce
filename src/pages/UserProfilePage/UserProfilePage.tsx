import "./UserProfilePage.scss";
import React, { ReactElement } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import BasicTabs from "./Tabs/Tabs";

function UserProfilePage(): ReactElement {
  return (
    <div className="userProfile-page">
      <Box className="wrapper__content">
        <Typography className="wrapper__content_title">MyAccount</Typography>
        <BasicTabs />
      </Box>
    </div>
  );
}

export default UserProfilePage;
