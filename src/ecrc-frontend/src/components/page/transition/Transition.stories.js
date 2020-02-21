import React from "react";

import Transition from "./Transition";

export default {
  title: "Transition Page",
  component: Transition
};

const header = {
  name: "header name"
};

export const Default = () => <Transition header={header} />;

export const Mobile = () => <Transition header={header} />;

Mobile.story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile2"
    }
  }
};
