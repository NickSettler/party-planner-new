import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./modules/store";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./helpers/theme/theme";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import ReactGA from "react-ga4";

declare global {
  interface PasswordCredentialData {
    id: string;
    name?: string;
    iconURL?: string;
    password: string;
  }

  interface PasswordCredentialConstructor extends Credential {
    new (passwordCredentialData: PasswordCredentialData): PasswordCredential;
    new (htmlFormElement: HTMLFormElement): PasswordCredential;
  }

  interface PasswordCredential extends Credential {
    readonly iconURL: string;
    readonly password: string;
    readonly name: string;
  }

  const PasswordCredential: PasswordCredentialConstructor;

  interface Window {
    PasswordCredential: PasswordCredentialConstructor;

    store: any;
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

ReactGA.initialize("G-LFX8QECN4V");
ReactGA.send("pageview");

Sentry.init({
  dsn: "https://ebd88944e5894badb4f7f44760427571@o525460.ingest.sentry.io/6123029",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
