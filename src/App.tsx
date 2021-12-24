import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

const App = (): JSX.Element => (
  <Router>
    <Header />
    <Routes>
      <Route path="/">{/*<Main />*/}</Route>
    </Routes>
  </Router>
);

export default App;
