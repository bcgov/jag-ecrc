import React from "react";
import { storiesOf } from "@storybook/react";

import Header from "./Header";

export default {
  title: "Header",
  component: Header
};

const header = {
  name: "eCrc"
};

storiesOf("Header", module)
  .add("Default", () => <Header header={header} />)
  .addParameters({ viewport: { defaultViewport: "mobile2" } })
  .add("Mobile", () => <Header header={header} />);
