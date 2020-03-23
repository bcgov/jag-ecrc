import React from "react";
import { storiesOf } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import TOU from "./TOU";
import {
  generateJWTToken,
  accessJWTToken
} from "../../../modules/AuthenticationHelper";

const header = {
  name: "Terms of Use"
};

const page = {
  header
};

sessionStorage.setItem("validator", "secret");
sessionStorage.setItem("uuid", "unique123");

const currentPayload = accessJWTToken(sessionStorage.getItem("jwt"));
const newPayload = {
  ...currentPayload,
  actionsPerformed: [
    "infoReview",
    "appForm",
    "tou",
    "bcscRedirect",
    "orgVerification",
    "consent",
    "userConfirmation"
  ],
  authorities: ["Authorized"]
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
