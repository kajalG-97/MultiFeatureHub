import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const BasicTabs = () => {
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
      <CustomTabPanel value={value} index={0}>
        <Box display="flex" flexWrap="wrap" gap="1rem">
          {Array(6)
            ?.fill(1)
            ?.map((e) => (
              <Box
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
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Box display="flex" flexWrap="wrap" gap="1rem">
          {Array(6)
            ?.fill(1)
            ?.map((e) => (
              <Box
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
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Box display="flex" flexWrap="wrap" gap="1rem">
          {Array(6)
            ?.fill(1)
            ?.map((e) => (
              <Box
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
      </CustomTabPanel>
    </Box>
  );
};

export default BasicTabs;
