import React from "react";
import { storiesOf } from "@storybook/react";

import TOU from "./TOU";

const header = {
  name: "Terms of Use"
};

const page = {
  header
};

storiesOf("Term Of Use page", module)
  .add("Default", () => <TOU page={page} />)
  .addParameters({ viewport: { defaultViewport: "mobile2" } })
  .add("Mobile", () => <TOU page={page} />);
