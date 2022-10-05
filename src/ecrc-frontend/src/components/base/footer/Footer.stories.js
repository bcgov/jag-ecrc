import React from "react";

import Footer from "./Footer";

export default {
  title: "Footer",
  component: Footer
};

export function Default() {
  return <Footer />;
}

export function Mobile() {
  return <Footer />;
}

Mobile.story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile2"
    }
  }
};
