import { Box, List, ListItem, Paper } from "@mui/material";
import React, { useState, useCallback } from "react";

// Debouncing function defined outside the component
const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const mockData = [
  "apple",
  "banana",
  "orange",
  "grape",
  "strawberry",
  "watermelon",
  "pineapple",
  "kiwi",
  "mango",
  "blueberry",
  "raspberry",
  "blackberry",
  "pear",
  "peach",
  "plum",
  "cherry",
  "fig",
  "pomegranate",
  "lime",
  "lemon",
  "apricot",
  "grapefruit",
  "melon",
  "nectarine",
  "papaya",
  "passionfruit",
  "persimmon",
  "quince",
  "tangerine",
  "clementine",
  "date",
  "guava",
  "lychee",
  "mandarin",
  "olive",
  "starfruit",
  "dragonfruit",
  "jackfruit",
];

const AutoCompleteSearch = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState(mockData);

  // Memoize the debounced function to set value
  const debouncedSetSearchQuery = useCallback(
    debounce((query) => {
      if (query) {
        console.log(`Input changed to: ${query}`);
        setData(
          mockData.filter((item) =>
            item.toLowerCase().includes(query.toLowerCase())
          )
        );
      } else {
        setData(mockData); // Reset data if query is empty
      }
    }, 1000),
    []
  );

  const handleChange = (e) => {
    const newValue = e.target.value;

    setValue(newValue);
    debouncedSetSearchQuery(newValue);
  };

  return (
    <Box padding="50px">
      <input
        style={{ width: "50%", fontSize: "18px" }}
        value={value}
        onChange={handleChange}
      />
      {data?.length > 0 && (
        <Paper elevation={3} style={{ marginTop: "10px", width: "50%" }}>
          <List>
            {data?.map((item, index) => (
              <ListItem key={index} onClick={() => setValue(item)}>
                {item}
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default AutoCompleteSearch;
