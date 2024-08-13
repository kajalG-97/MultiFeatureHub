import React from "react";
import { menuData } from "./util";
import MenuItem from "./MenuItem";
import { Box, Typography } from "@mui/material";

const CascadeSelectView = () => {
  return (
    <Box
      padding="24px"
      display="flex"
      flexDirection="column"
      gap="40px"
      alignItems="center"
    >
      <Typography fontWeight="700" fontSize="34px" color="#666">
        Cascade Example
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid #ddd",
          width: "400px",
          margin: "auto",
        }}
      >
        {menuData?.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </div>
    </Box>
  );
};

export default CascadeSelectView;
