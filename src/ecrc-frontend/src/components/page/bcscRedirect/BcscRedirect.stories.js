/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { storiesOf } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import BcscRedirect from "./BcscRedirect";
import {
  generateJWTToken,
  accessJWTToken
} from "../../../modules/AuthenticationHelper";

const header = {
  name: "BC Services Card"
};

const saveOrg = () => {};

const page = {
  header,
  saveOrg
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
