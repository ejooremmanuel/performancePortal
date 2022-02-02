import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import LoginScreen from "./screens/LoginScreen";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<LoginScreen />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
