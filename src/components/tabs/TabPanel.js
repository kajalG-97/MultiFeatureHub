import { Box } from "@mui/material";
import React from "react";

const TabPanel = (props) => {
  const { children, value, index } = props;
  if (value === index) return <Box sx={{ p: 3 }}>{children}</Box>;
};

export default TabPanel;
