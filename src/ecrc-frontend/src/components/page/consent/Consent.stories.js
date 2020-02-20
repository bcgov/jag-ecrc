import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";

import Consent from "./Consent";

const header = {
  name: "Criminal Record Check"
};

const pageLayout = {
  header
};

const page = {
  pageLayout
};

const onContinueClick = action("onButtonContinueClicked");

storiesOf("Consent page", module)
  .add("Default", () => (
    <Consent page={page} onContinueClick={onContinueClick} />
  ))
  .addParameters({ viewport: { defaultViewport: "mobile2" } })
  .add("Mobile", () => (
    <Consent page={page} onContinueClick={onContinueClick} />
  ));
