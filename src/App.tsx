import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardIndex from "./pages/dashboard/Index/DashboardIndex";
import ProtectedRoute from "./uikit/ProtectedRoute/ProtectedRoute";

const App = (): JSX.Element => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        path={"/dashboard/*"}
        element={
          <ProtectedRoute>
            <DashboardIndex />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

export default App;
