import React from "react";

import Transition from "./Transition";

export default {
  title: "Transition Page",
  component: Transition
};

const header = {
  name: "header name"
};

const page = {
  header
};

export const DefaultToBCSC = () => <Transition page={page} />;

export const NotWhitelisted = () => (
  <Transition page={{ ...page, transitionReason: "notwhitelisted" }} />
);

export const Mobile = () => <Transition page={page} />;

Mobile.story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile2"
    }
  }
};
