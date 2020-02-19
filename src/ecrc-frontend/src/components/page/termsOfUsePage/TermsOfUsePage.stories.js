import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";

import TermsOfUsePage from "./TermsOfUsePage";

const header = {
  name: "Terms of Use"
};

const pageLayout = {
  header
};

const page = {
  pageLayout
};

const onContinueClick = action("onButtonContinueClicked");

storiesOf("Term Of Use page", module)
  .add("Default", () => (
    <TermsOfUsePage page={page} onContinueClick={onContinueClick} />
  ))
  .addParameters({ viewport: { defaultViewport: "mobile2" } })
  .add("Mobile", () => (
    <TermsOfUsePage page={page} onContinueClick={onContinueClick} />
  ));
