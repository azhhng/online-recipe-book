import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import React, { useEffect } from "react";
import WelcomePage from "./pages/WelcomePage";
import Header from "./components/Header/Header";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  useEffect(() => {
    const testGet = async () => {
      const response = (
        await axios.get(`${process.env.REACT_APP_API_ADDRESS}/test-get`)
      ).data;
      console.log(response);
    };
    testGet();
  }, []);

  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/profile/:user" element={<ProfilePage />} />

          {/* <Route exact path="*">
            <NotFound />
          </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
