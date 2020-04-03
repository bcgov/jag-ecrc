import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

// prevent user from leaving site and losing saved data
window.addEventListener("beforeunload", e => {
  if (sessionStorage.getItem("validExit")) {
    sessionStorage.removeItem("validExit");
    return false;
  }

  if (!sessionStorage.getItem("uuid")) return false;

  if (
    window.history.location &&
    window.history.location.pathname &&
    window.history.location.pathname === "/criminalrecordcheck"
  ) {
    return false;
  }

  const confirmationMessage =
    "You are in the middle of completing your eCRC. If you leave, your changes will be lost. Are you sure you would like to leave?";

  (e || window.event).returnValue = confirmationMessage; // Gecko + IE

  return confirmationMessage;
});

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
