import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AutoCompleteSearch from "./components/AutoCompleteSearch";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="search" element={<AutoCompleteSearch />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
