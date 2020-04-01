import React from "react";
import { storiesOf } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import TOU from "./TOU";
import { generateJWTToken } from "../../../modules/AuthenticationHelper";

const header = {
  name: "Terms of Use"
};

const setError = () => {};

const page = {
  header,
  setError
};

sessionStorage.setItem("validator", "secret");
sessionStorage.setItem("uuid", "unique123");

const newPayload = {
  actionsPerformed: [
    "infoReview",
    "appForm",
    "tou",
    "bcscRedirect",
    "orgVerification",
    "consent"
  ],
  authorities: ["Authorized", "ROLE"]
};
generateJWTToken(newPayload);

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
