import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "./Tabs";
import Tab from "./Tab";
import TabPanel from "./TabPanel";

function a11yProps(index) {
  return {
    id: index,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CustomTab = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box border="1px solid #eee" padding="30px" sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Kajal" {...a11yProps(0)} />
          <Tab label="Kuldeep" {...a11yProps(1)} />
          <Tab label="Kunal" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box display="flex" flexWrap="wrap" gap="1rem">
          {Array(6)
            ?.fill(1)
            ?.map((e) => (
              <Box
                key={e}
                width="180px"
                height="180px"
                borderRadius="12px"
                bgcolor="#f1f4ff"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                This is ex
              </Box>
            ))}
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box display="flex" flexWrap="wrap" gap="1rem">
          {Array(6)
            ?.fill(1)
            ?.map((e) => (
              <Box
                key={e}
                width="180px"
                height="180px"
                borderRadius="12px"
                bgcolor="#f5fbf3"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                This is ex
              </Box>
            ))}
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box display="flex" flexWrap="wrap" gap="1rem">
          {Array(6)
            ?.fill(1)
            ?.map((e) => (
              <Box
                key={e}
                width="180px"
                height="180px"
                borderRadius="12px"
                bgcolor="#FEF3F2"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                This is ex
              </Box>
            ))}
        </Box>
      </TabPanel>
    </Box>
  );
};

export default CustomTab;
