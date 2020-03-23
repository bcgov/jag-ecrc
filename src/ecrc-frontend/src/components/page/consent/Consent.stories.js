import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import Consent from "./Consent";
import {
  generateJWTToken,
  accessJWTToken
} from "../../../modules/AuthenticationHelper";

const header = {
  name: "Criminal Record Check"
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

const onContinueClick = action("onButtonContinueClicked");

storiesOf("Consent page", module)
  .add("Default", () => (
    <MemoryRouter>
      <Consent page={page} onContinueClick={onContinueClick} />
    </MemoryRouter>
  ))
  .addParameters({ viewport: { defaultViewport: "mobile2" } })
  .add("Mobile", () => (
    <MemoryRouter>
      <Consent page={page} onContinueClick={onContinueClick} />
    </MemoryRouter>
  ));
