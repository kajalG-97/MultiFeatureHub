import { Box, Typography } from "@mui/material";
import React, { useState } from "react";

const TicketHall = () => {
  const [booked, setBooked] = useState([]);
  const availableSeats = [1, 39, 4, 5, 74, 67, 3, 5678, 897, 35];

  const handleClick = (e) => {
    if (booked?.includes(e)) setBooked(booked.filter((seat) => seat !== e));
    else {
      setBooked((prev) => [...prev, e]);
    }
  };

  const getBgColor = (e) => {
    if (booked?.includes(e)) return "#918cb8";
    return "#f1f4ff";
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Ticket Booking
      </Typography>
      <Box display="flex" gap="2rem" flexWrap="wrap" padding="50px">
        {availableSeats?.map((e) => (
          <Box
            key={e}
            width="180px"
            height="180px"
            borderRadius="12px"
            bgcolor={getBgColor(e)}
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={() => handleClick(e)}
          >
            {e}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TicketHall;
