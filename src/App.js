import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import LoginScreen from "./screens/LoginScreen";
import StartAppraisal from "./screens/StartAppraisal";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<LoginScreen />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/startappraisal" exact element={<StartAppraisal />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
