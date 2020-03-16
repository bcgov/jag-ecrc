import React from "react";
import { action } from "@storybook/addon-actions";
import { MemoryRouter } from "react-router-dom";
import { generateJWTToken } from "../../../modules/AuthenticationHelper";

import Consent from "./Consent";

export default {
  title: "ConsentPage",
  component: Consent
};

const header = {
  name: "Criminal Record Check"
};

const page = {
  header
};

const onContinueClick = action("onButtonContinueClicked");

sessionStorage.setItem("validator", "secret");

generateJWTToken({ authorities: ["Authorized"] });

export const Default = () => (
  <MemoryRouter>
    <Consent page={page} onContinueClick={onContinueClick} />
  </MemoryRouter>
);

export const Mobile = () => (
  <Consent page={page} onContinueClick={onContinueClick} />
);

Mobile.story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile2"
    }
  }
};
