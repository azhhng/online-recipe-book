import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import WelcomePage from "./pages/WelcomePage";
import Header from "./components/Header/Header";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/profile/:user" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
