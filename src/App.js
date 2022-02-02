import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/header_";
import EditNavbar from "./component/navigation_";
import PictureBar from "./component/pictureBar_";
import LoginScreen from "./screens/LoginScreen";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<LoginScreen />} />
          <Route path="/header" exact element={<Header />} />
          <Route path="/editnavbar" exact element={<EditNavbar />} />
          <Route path="/Picturebar" exact element={<PictureBar />} />
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
