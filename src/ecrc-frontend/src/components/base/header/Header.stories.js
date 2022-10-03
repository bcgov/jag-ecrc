import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import Header from "./Header";

export default {
  title: "Header",
  component: Header
};

const header = {
  name: "Criminal Record Check"
};

const history = createMemoryHistory();

export function Default() {
  return (
    <Router history={history}>
      <Header header={header} />
    </Router>
  );
}

export function Mobile() {
  return (
    <Router history={history}>
      <Header header={header} />
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
