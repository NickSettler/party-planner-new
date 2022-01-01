import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Router from "./routes";
import GlobalStyles from "./helpers/theme/GlobalStyles";

const App = (): JSX.Element => (
  <BrowserRouter>
    <Header />
    <GlobalStyles />
    <Router />
  </BrowserRouter>
);

export default App;
