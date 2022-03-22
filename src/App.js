import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginScreen, Dashboard, Profile, BasicInfo } from "./screens";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<LoginScreen />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/profile" exact element={<Profile />} />
          <Route path="/profile/basicInfo" exact element={<BasicInfo />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
