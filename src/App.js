// src/App.js
import React from "react";
import {
  HashRouter,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AuthForm from "./views/authform";
import "./App.css"
import Photos from "./views";
import UserProfileScreen from "./views/profile";

function App() {
  return (
    <HashRouter basename="/">
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/Home" element={<Photos />} />
        <Route path="/Home/profile" element={<UserProfileScreen />} />
        
      </Routes>
   </HashRouter>
  );
}

export default App;