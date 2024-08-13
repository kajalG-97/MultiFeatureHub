import { Box, Typography } from "@mui/material";
import React from "react";

const Tab = ({ label, id, onClick, isActive }) => {
  return (
    <Box
      p={2}
      onClick={() => onClick(id)}
      sx={{
        cursor: "pointer",
        backgroundColor: isActive ? "#1976d2" : "transparent",
        color: isActive ? "#fff" : "#000",
        borderBottom: isActive ? "2px solid #1976d2" : "2px solid transparent",
      }}
    >
      <Typography>{label}</Typography>
    </Box>
  );
};

export default Tab;
