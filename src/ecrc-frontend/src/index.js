import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { storeValidator } from "../src/modules/AuthenticationHelper";

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

storeValidator();

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
