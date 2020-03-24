import React from "react";
import { MemoryRouter } from "react-router-dom";
import { storiesOf } from "@storybook/react";
import { withQuery } from "@storybook/addon-queryparams";

import UserConfirmation from "./UserConfirmation";

const header = {
  name: "header name"
};

const setApplicant = () => {};
const setError = () => {};

const page = {
  header,
  setApplicant,
  setError
};

sessionStorage.setItem("validator", "secret");
sessionStorage.setItem("uuid", "unique123");

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
