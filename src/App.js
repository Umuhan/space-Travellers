// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Rockets from "./pages/Rockets";
import Missions from "./pages/Missions";
import MyProfile from "./pages/MyProfile";
import { Provider } from "react-redux";

const App = () => (
  <Router>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/rockets" element={<Rockets />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/myprofile" element={MyProfile} />
      </Routes>
    </div>
  </Router>
);

export default App;
