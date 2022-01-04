import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import GlobalStyles from "./helpers/theme/GlobalStyles";
import "./assets/css/App.css";

const App = (): JSX.Element => (
  <BrowserRouter>
    <GlobalStyles />
    <Router />
  </BrowserRouter>
);

export default App;
