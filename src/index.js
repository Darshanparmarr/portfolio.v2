import React from "react";
import ReactDOM from "react-dom";
import "./styles/tokens.css";
import "./styles/base.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// Enable offline support + installability (production only).
serviceWorkerRegistration.register();
