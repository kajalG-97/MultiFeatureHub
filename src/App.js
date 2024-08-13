import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AutoCompleteSearch from "./components/AutoCompleteSearch";
import CascadeSelectView from "./components/cascade";
import NotFound from "./components/NotFound";
import BasicTabs from "./components/tabs";
import CustomTab from "./components/tabs/CustomTab";
import TicketHall from "./components/TicketHall";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="search" element={<AutoCompleteSearch />} />
          <Route path="book/ticket" element={<TicketHall />} />
          <Route path="tabs" element={<CustomTab />} />
          <Route path="basic-tabs" element={<BasicTabs />} />
          <Route path="cascade" element={<CascadeSelectView />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
