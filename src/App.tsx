import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import SignInPage from "./pages/SignInPage";

const App = (): JSX.Element => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signin" element={<SignInPage />} />
    </Routes>
  </Router>
);

export default App;
