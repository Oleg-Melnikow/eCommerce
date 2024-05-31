import React, { ReactElement } from "react";

import Box from "@mui/material/Box";

interface TabPanelProps {
  index: number;
  value: number;
  children: React.ReactNode;
}

function CustomTabPanel({
  index,
  value,
  children = null,
  ...other
}: TabPanelProps): ReactElement {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ padding: "16px" }}>{children}</Box>}
    </div>
  );
}

export default CustomTabPanel;
