import React from "react";
import { MemoryRouter } from "react-router-dom";
import { storiesOf, addDecorator } from "@storybook/react";
import { withQuery } from "@storybook/addon-queryparams";

import UserConfirmation from "./UserConfirmation";

const header = {
  name: "header name"
};

const setApplicant = () => {};

const page = {
  header,
  setApplicant
};

storiesOf("User Confirmation page", module)
  .addDecorator(withQuery)
  .addParameters({
    query: {
      code: "mycode"
    }
  })
  .add("Default", () => (
    <MemoryRouter>
      <UserConfirmation page={page} />
    </MemoryRouter>
  ))
  .addParameters({ viewport: { defaultViewport: "mobile2" } })
  .add("Mobile", () => (
    <MemoryRouter>
      <UserConfirmation page={page} />
    </MemoryRouter>
  ));
