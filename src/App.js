import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import Header from "./components/Header/Header";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import RecipePage from "./pages/RecipePage/RecipePage";
import RecipeBoxPage from "./pages/RecipeBoxPage/RecipeBoxPage";
import ExplorePage from "./pages/ExplorePage/ExplorePage";
import OnboardingPage from "./pages/OnboardingPage/OnboardingPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="onboarding" element={<OnboardingPage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="profile/:user" element={<ProfilePage />} />
          <Route path="profile/:user/recipes" element={<RecipePage />} />
          <Route
            path="profile/:user/recipe-boxes"
            element={<RecipeBoxPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
