import React from "react";
import { action } from "@storybook/addon-actions";

import { Button } from "./Button";

export default {
  component: Button,
  title: "Button",
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/
};

export const buttonData = {
  children: "buttonChildren",
  onClick: action("onButtonClicked"),
  buttonStyle: "btn--primary--solid",
  buttonSize: "btn--medium"
};

export const Default = () => {
  return <Button button={buttonData} />;
};
