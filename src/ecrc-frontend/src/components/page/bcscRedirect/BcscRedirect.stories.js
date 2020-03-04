import React from "react";
import { storiesOf } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import BcscRedirect from "./BcscRedirect";

const header = {
  name: "BC Services Card"
};

const page = {
  header
};

storiesOf("BcscRedirect page", module)
  .add("Default", () => (
    <MemoryRouter>
      <BcscRedirect page={page} />{" "}
    </MemoryRouter>
  ))
  .addParameters({ viewport: { defaultViewport: "mobile2" } })
  .add("Mobile", () => (
    <MemoryRouter>
      <BcscRedirect page={page} />
    </MemoryRouter>
  ));
