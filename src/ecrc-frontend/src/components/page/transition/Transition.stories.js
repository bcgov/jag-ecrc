import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import Transition from "./Transition";

export default {
  title: "Transition Page",
  component: Transition
};

const header = {
  name: "header name"
};

const page = {
  header
};

const history = createMemoryHistory();

export const DefaultToBCSC = () => (
  <Router history={history}>
    <Transition page={page} />
  </Router>
);

export const NotWhitelisted = () => (
  <Router history={history}>
    <Transition page={{ ...page, transitionReason: "notwhitelisted" }} />
  </Router>
);

export const Mobile = () => (
  <Router history={history}>
    <Transition page={page} />
  </Router>
);

Mobile.story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile2"
    }
  }
};
