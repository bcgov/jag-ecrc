import React from "react";
import { storiesOf } from "@storybook/react";

import BcscRedirect from "./BcscRedirect";

const header = {
  name: "BC Services Card"
};

const page = {
  header
};

storiesOf("BcscRedirect page", module)
  .add("Default", () => <BcscRedirect page={page} />)
  .addParameters({ viewport: { defaultViewport: "mobile2" } })
  .add("Mobile", () => <BcscRedirect page={page} />);
