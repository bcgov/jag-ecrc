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

export function DefaultToBCSC() {
  return (
    <Router history={history}>
      <Transition page={page} />
    </Router>
  );
}

export function Mobile() {
  return (
    <Router history={history}>
      <Transition page={page} />
    </Router>
  );
}

Mobile.story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile2"
    }
  }
};
