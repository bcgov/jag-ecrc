import React from "react";
import { storiesOf, addParameters } from "@storybook/react";

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

storiesOf("Term Of Use page", module)
  .add("Default", () => <TermsOfUsePage page={page} />)
  .addParameters({ viewport: { defaultViewport: "mobile2" } })
  .add("Mobile", () => <TermsOfUsePage page={page} />);
