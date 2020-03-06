/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { storiesOf } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import BcscRedirect from "./BcscRedirect";

const header = {
  name: "BC Services Card"
};

const saveOrg = () => {};

const page = {
  header,
  saveOrg
};

storiesOf("BcscRedirect page", module)
  .add("Default", () => (
    <MemoryRouter>
      <BcscRedirect page={page} />
    </MemoryRouter>
  ))
  .addParameters({ viewport: { defaultViewport: "mobile2" } })
  .add("Mobile", () => (
    <MemoryRouter>
      <BcscRedirect page={page} />
    </MemoryRouter>
  ));
