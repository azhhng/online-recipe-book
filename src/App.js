import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import Header from "./components/Header/Header";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import RecipePage from "./pages/RecipePage/RecipePage";

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/profile/:user" element={<ProfilePage />} />
          <Route path="/profile/:user/recipes" element={<RecipePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
