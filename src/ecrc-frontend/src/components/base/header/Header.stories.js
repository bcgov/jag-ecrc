import React from "react";
import { storiesOf } from "@storybook/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import Header from "./Header";

export default {
  title: "Header",
  component: Header
};

const header = {
  name: "eCrc"
};

const history = createMemoryHistory();

storiesOf("Header", module)
  .add("Default", () => (
    <Router history={history}>
      <Header header={header} />
    </Router>
  ))
  .addParameters({ viewport: { defaultViewport: "mobile2" } })
  .add("Mobile", () => (
    <Router history={history}>
      <Header header={header} />
    </Router>
  ));
