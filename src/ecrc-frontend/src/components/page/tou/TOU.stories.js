import React from "react";
import { storiesOf } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import TOU from "./TOU";

const header = {
  name: "Terms of Use"
};

const page = {
  header
};

storiesOf("Term Of Use page", module)
  .add("Default", () => (
    <MemoryRouter>
      <TOU page={page} />
    </MemoryRouter>
  ))
  .addParameters({ viewport: { defaultViewport: "mobile2" } })
  .add("Mobile", () => (
    <MemoryRouter>
      <TOU page={page} />
    </MemoryRouter>
  ));
