import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { Button } from "./Button";

const button = {
  label: "button label",
  onClick: action("onButtonClicked"),
  buttonStyle: "btn btn-primary",
  buttonSize: "btn btn-sm",
  type: "submit"
};

storiesOf("Button", module)
  .add("Default", () => <Button button={button} />)
  .add("Warning", () => (
    <Button
      button={{
        ...button,
        buttonStyle: "btn btn-warning",
        buttonSize: "btn btn-sm"
      }}
    />
  ));
