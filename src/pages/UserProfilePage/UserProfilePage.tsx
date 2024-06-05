import { ReactElement } from "react";
import useAuth from "hooks/use-auth";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BasicTabs from "./Tabs/Tabs";
import "./UserProfilePage.scss";

function UserProfilePage(): ReactElement {
  const { user } = useAuth();
  return !user ? (
    <Box />
  ) : (
    <div className="userProfile-page">
      <Box className="wrapper__content">
        <Typography className="wrapper__content_title">MyAccount</Typography>
        <BasicTabs />
      </Box>
    </div>
  );
}

export default UserProfilePage;
