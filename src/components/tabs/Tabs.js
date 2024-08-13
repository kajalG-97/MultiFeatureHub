import { Box } from "@mui/material";
import React from "react";

const Tabs = (props) => {
  const { value, onChange, children } = props;
  console.log("Tabs props", value);
  return (
    <Box display="flex" gap="2rem">
      {children?.map?.((child) => (
        <Box
          key={child}
          p={2}
          onChange={(e) => {
            onChange(e, child?.id);
            console.log("ch", e);
          }}
        >
          {child}
        </Box>
      ))}

      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          onClick: onChange,
          isActive: value === index,
          id: index, // Assign the index as the id
        })
      )}
    </Box>
  );
};

export default Tabs;
