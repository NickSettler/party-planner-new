import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Router from "./routes";

const App = (): JSX.Element => (
  <BrowserRouter>
    <Header />
    <Router />
  </BrowserRouter>
);

export default App;
