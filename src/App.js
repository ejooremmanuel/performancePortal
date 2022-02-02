import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<LoginScreen />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
