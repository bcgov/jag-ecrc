import React from "react";
import { storiesOf } from "@storybook/react";

import Footer from "./Footer";

export default {
  title: "Footer",
  component: Footer
};

storiesOf("Footer", module)
  .add("Default", () => <Footer />)
  .addParameters({ viewport: { defaultViewport: "mobile2" } })
  .add("Mobile", () => <Footer />);
